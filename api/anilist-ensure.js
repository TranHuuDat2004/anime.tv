// Vercel Serverless Function
// - Tìm anime trên AniList (GraphQL)
// - Kiểm tra/ cập nhật file data/anime/<id>.json trong GitHub repo
// - Tạo PR nếu cần (để tránh ghi thẳng vào main)
//
// Cần env vars trên Vercel:
// - GITHUB_TOKEN: token cá nhân có quyền tạo PR/commit (classic fine-grained)
// - GITHUB_OWNER: ví dụ TranHuuDat2004
// - GITHUB_REPO: ví dụ anime.tv
// - GITHUB_DEFAULT_BRANCH (optional): mặc định "main"
//
// Endpoint:
// - POST /api/anilist-ensure
// body: { query: string, slug?: string }

const ANILIST_GRAPHQL_URL = 'https://graphql.anilist.co';
const DEFAULT_BRANCH = process.env.GITHUB_DEFAULT_BRANCH || 'main';

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function setCors(res) {
  // Có thể chặt hơn sau, nhưng để dễ tích hợp từ Pages/host khác dùng tạm thời allow all.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function slugify(input) {
  if (!input) return '';
  return input
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // đổi ký tự lạ thành -
    .replace(/(^-|-$)+/g, ''); // trim -
}

function mapFormatToType(format) {
  if (!format) return 'Series';
  if (format === 'MOVIE') return 'Movie';
  // TV/ONA/OVA... coi là Series theo UI của bạn
  return 'Series';
}

function mapStatus(status) {
  const map = {
    RELEASING: 'Đang chiếu',
    FINISHED: 'Hoàn thành',
    NOT_YET_RELEASED: 'Chưa phát hành',
    CANCELLED: 'Bị hủy',
    HIATUS: 'Tạm dừng',
  };
  return map[status] || status || 'N/A';
}

async function aniSearchTopMatch(query) {
  const q = (query || '').trim();
  if (!q) return null;

  const queryText = `
    query ($search: String) {
      Media(search: $search, type: ANIME, sort: SEARCH_MATCH, first: 1) {
        id
        title { english romaji native }
        description(asHtml: false)
        genres
        format
        status
        startDate { year }
        coverImage { large medium }
      }
    }
  `;

  const resp = await fetch(ANILIST_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryText, variables: { search: q } }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`AniList HTTP ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  const media = data?.data?.Media;
  if (!media) return null;
  return media;
}

async function githubRequest(path, { method = 'GET', token, body, accept = 'application/vnd.github+json' } = {}) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const url = `https://api.github.com${path.startsWith('/') ? path : `/${path}`}`;

  const headers = {
    Accept: accept,
    Authorization: `Bearer ${token}`,
  };

  const resp = await fetch(url.replace('{owner}', owner).replace('{repo}', repo), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Với GitHub API, 404 là bình thường khi file chưa tồn tại
  if (!resp.ok) {
    let msg = '';
    try {
      const t = await resp.text();
      msg = t?.slice(0, 500);
    } catch {
      // ignore
    }
    const err = new Error(`GitHub HTTP ${resp.status} ${resp.statusText}: ${msg}`);
    err.status = resp.status;
    throw err;
  }

  // trả luôn JSON
  return resp.json();
}

async function githubGetFile(token, filePath) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(filePath)}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (resp.status === 404) return null;
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`GitHub GET file failed: HTTP ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  const contentBase64 = data.content;
  const content = Buffer.from(contentBase64, 'base64').toString('utf-8');
  return { sha: data.sha, content, data };
}

async function mapQueryToAnimeListId(token, query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return '';

  const listFile = await githubGetFile(token, 'data/anime-list.json');
  if (!listFile) return '';

  let list;
  try {
    list = JSON.parse(listFile.content);
  } catch {
    return '';
  }
  if (!Array.isArray(list)) return '';

  let best = null;
  let bestScore = -1;

  for (const item of list) {
    const id = String(item?.id || '').trim();
    const title = String(item?.title || '').trim();
    if (!id && !title) continue;

    const idLower = id.toLowerCase();
    const titleLower = title.toLowerCase();

    let score = 0;
    if (idLower === q) score = 100;
    else if (titleLower === q) score = 50;
    else if (titleLower.includes(q)) score = 20;
    else if (idLower.includes(q)) score = 15;
    else if (q.includes(titleLower) && titleLower.length >= 3) score = 10;

    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }

  return bestScore > 0 ? best : '';
}

async function githubCreateBranch(token, branchName, fromBranch = DEFAULT_BRANCH) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const url = `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(fromBranch)}`;
  const baseRef = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!baseRef.ok) {
    const text = await baseRef.text().catch(() => '');
    throw new Error(`GitHub base ref failed: HTTP ${baseRef.status}: ${text}`);
  }

  const baseData = await baseRef.json();
  const sha = baseData.object.sha;

  const createUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
  const createResp = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha,
    }),
  });

  if (!createResp.ok) {
    const text = await createResp.text().catch(() => '');
    throw new Error(`GitHub create ref failed: HTTP ${createResp.status}: ${text}`);
  }
}

async function githubPutFile(token, filePath, content, branchName, message) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(filePath)}`;

  const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: branchName,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`GitHub PUT file failed: HTTP ${resp.status}: ${text}`);
  }

  return resp.json();
}

async function githubCreatePR(token, { branchName, base = DEFAULT_BRANCH, title, body }) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      head: `${owner}:${branchName}`,
      base,
      body: body || '',
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`GitHub create PR failed: HTTP ${resp.status}: ${text}`);
  }

  return resp.json();
}

async function ensureOrCreateAnimeJson({ token, query, slug }) {
  const media = await aniSearchTopMatch(query);
  if (!media) return { anime: null, prUrl: null, updated: false, created: false };

  const resolvedSlug = slug || slugify(media.title?.romaji || media.title?.english || media.title?.native || query);
  if (!resolvedSlug) return { anime: null, prUrl: null, updated: false, created: false };

  const filePath = `data/anime/${resolvedSlug}.json`;
  const existing = await githubGetFile(token, filePath);

  const description = (media.description || '').trim();
  const posterImage = media.coverImage?.medium || '';
  const bannerImage = media.coverImage?.large || '';
  const titleEnglish = media.title?.english || media.title?.romaji || media.title?.native || resolvedSlug;
  const altTitle = media.title?.native || media.title?.romaji || media.title?.english || '';

  const fetched = {
    id: resolvedSlug,
    title: titleEnglish,
    altTitle: altTitle || undefined,
    posterImage: posterImage || undefined,
    bannerImage: bannerImage || undefined,
    logoImage: '',
    description,
    genres: Array.isArray(media.genres) ? media.genres : [],
    rating: media?.rating || undefined,
    type: mapFormatToType(media.format),
    status: mapStatus(media.status),
    releaseYear: media?.startDate?.year || undefined,
    // episodes / relatedAnime / crunchyrollTags: để trống nếu chưa có dữ liệu thủ công
  };

  if (existing) {
    let parsed;
    try {
      parsed = JSON.parse(existing.content);
    } catch (e) {
      // Nếu file đã lỗi JSON, vẫn trả về fetched để client render, nhưng không nên ghi đè tự động.
      return { anime: fetched, prUrl: null, updated: false, created: false, reason: 'Existing JSON parse error' };
    }

    const existingDesc = (parsed.description || '').trim();
    if (existingDesc.length > 0) {
      // Không cần cập nhật
      return { anime: parsed, prUrl: null, updated: false, created: false };
    }

    // Chỉ cập nhật description (ưu tiên giữ nguyên mô tả VN/fields khác nếu đã có)
    parsed.description = description;
    // Nếu banner/poster đang thiếu thì có thể bổ sung (tuỳ chọn). Bạn có thể tắt 2 dòng này nếu muốn strict chỉ description.
    if (!parsed.bannerImage && fetched.bannerImage) parsed.bannerImage = fetched.bannerImage;
    if (!parsed.posterImage && fetched.posterImage) parsed.posterImage = fetched.posterImage;
    if (!parsed.altTitle && fetched.altTitle) parsed.altTitle = fetched.altTitle;
    if (!parsed.genres && fetched.genres?.length) parsed.genres = fetched.genres;

    const newContent = JSON.stringify(parsed, null, 2) + '\n';
    return { anime: parsed, prUrl: null, updated: true, created: false, filePath, newContent };
  }

  // File chưa tồn tại => tạo mới
  const newContent = JSON.stringify(fetched, null, 2) + '\n';
  return { anime: fetched, prUrl: null, updated: true, created: true, filePath, newContent };
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (req.method !== 'POST' && req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return json(res, 500, { error: 'Missing GITHUB_TOKEN env var' });
    if (!process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
      return json(res, 500, { error: 'Missing GITHUB_OWNER/GITHUB_REPO env vars' });
    }

    // Parse input
    let query = '';
    let slug = '';
    if (req.method === 'GET') {
      const u = new URL(req.url, 'http://localhost');
      query = u.searchParams.get('query') || '';
      slug = u.searchParams.get('slug') || '';
    } else {
      // POST
      const bodyText = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });
      const body = bodyText ? JSON.parse(bodyText) : {};
      query = body.query || '';
      slug = body.slug || '';
    }

    query = (query || '').trim();
    slug = (slug || '').trim();

    if (!query && !slug) return json(res, 400, { error: 'Missing query/slug' });

    // Nếu caller chỉ cung cấp query (không có slug/id repo), ta cố gắng map query -> id trong `data/anime-list.json`
    // để không tạo sai file (ví dụ AniList title không khớp slug repo như `roshidere`).
    let resolvedSlug = slug;
    if (!resolvedSlug) {
      resolvedSlug = await mapQueryToAnimeListId(token, query);
    }

    // Lưu ý: AniList cần query/search term, slug chỉ để xác định file path trong repo.
    // Khi slug đã map đúng, ta sẽ chỉ update JSON tương ứng của bạn.
    const ensure = await ensureOrCreateAnimeJson({ token, query, slug: resolvedSlug });
    if (!ensure.anime) return json(res, 404, { error: 'AniList match not found' });

    // Nếu chưa cần cập nhật file thì trả ngay
    if (!ensure.updated) {
      return json(res, 200, { anime: ensure.anime, updated: false, created: false, prUrl: null });
    }

    const branchSuffix = `${ensure.anime.id}-${Date.now().toString(36)}`.replace(/[^a-z0-9\-]/g, '-');
    const branchName = `auto/anilist-desc-${branchSuffix}`.slice(0, 120);

    await githubCreateBranch(token, branchName, DEFAULT_BRANCH);
    await githubPutFile(token, ensure.filePath, ensure.newContent, branchName, `chore: add AniList description for ${ensure.anime.id}`);

    const pr = await githubCreatePR(token, {
      branchName,
      base: DEFAULT_BRANCH,
      title: `Add AniList description for ${ensure.anime.id}`,
      body: `Generated description from AniList GraphQL.\n\n- anime id: ${ensure.anime.id}\n- created: ${ensure.created ? 'yes' : 'no'}`,
    });

    return json(res, 200, {
      anime: ensure.anime,
      updated: true,
      created: !!ensure.created,
      prUrl: pr?.html_url || null,
    });
  } catch (e) {
    return json(res, 500, { error: e?.message || 'Unknown error' });
  }
};

