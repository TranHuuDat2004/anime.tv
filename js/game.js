document.addEventListener('DOMContentLoaded', () => {
    const insBtn = document.getElementById('insBtn');
    const insSidebar = document.getElementById('insSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    function toggleSidebar() {
        insSidebar.classList.toggle('open');
    }

    function closeSidebarIfClickedOutside(event) {
        if (!insSidebar.contains(event.target) && !insBtn.contains(event.target)) {
            insSidebar.classList.remove('open');
        }
    }

    insBtn.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    window.addEventListener('click', closeSidebarIfClickedOutside);
});

// --- KHAI BÁO BIẾN TOÀN CỤC ---
let timerInterval = null;
let startTime = null;     // Dùng cho chế độ classic
let timerSecondsRemaining = 0; // Dùng cho chế độ countdown
let countdownDuration = 30; // Giá trị mặc định theo giây
let timerRunning = false;
let gameWon = false;
let timeUp = false;      // Cờ mới cho trạng thái hết giờ
let draggedElement = null;
let currentPuzzleId = 'paimon';
let gameMode = 'classic'; // Chế độ chơi mặc định
let touchStartTime = null;
let touchStartPos = { x: 0, y: 0 };
const TOUCH_TAP_THRESHOLD = 200; // Thời gian tối đa (ms) để coi là tap
const TOUCH_MOVE_THRESHOLD = 10; // Khoảng cách tối thiểu (px) để coi là kéo

// --- Các hàm xử lý thời gian ---
function startTimer() {
    if (timerRunning || gameWon || timeUp) return;
    timerRunning = true;
    if (gameMode === 'classic') {
        startTime = Date.now();
        timerInterval = setInterval(updateClassicTimer, 1000);
        updateClassicTimer();
        console.log('Classic Timer started');
    } else if (gameMode === 'countdown') {
        timerSecondsRemaining = countdownDuration;
        timerInterval = setInterval(updateCountdownTimer, 1000);
        updateCountdownTimer();
        console.log(`Countdown Timer started (${countdownDuration}s)`);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    console.log('Timer stopped');
}

function updateClassicTimer() {
    if (!startTime) return;
    const elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime / 1000);
}

function updateCountdownTimer() {
    if (timerSecondsRemaining <= 0 || gameWon) {
        if (timerSecondsRemaining <= 0 && !gameWon) {
            handleTimeUp();
        } else {
            stopTimer();
        }
        return;
    }
    timerSecondsRemaining--;
    displayTime(timerSecondsRemaining);
    if (timerSecondsRemaining <= 0) {  // Thời gian đã hết
        handleTimeUp();
    }   
}

function displayTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    $('#timer-display').text(`Thời gian: ${formattedTime}`);
}

function handleTimeUp() {
    console.log("Time's Up!");
    timeUp = true;
    stopTimer();
    $('#game-table').addClass('game-lost').removeClass('game-won');
    $('#game-table img, #image-list img').attr('draggable', false).css('cursor', 'not-allowed');
    $('#loseModal').modal('show');
}

function getFinalTime() {
    const elapsedTime = Date.now() - startTime;
    const totalSeconds = elapsedTime / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// --- Hàm kiểm tra điều kiện thắng ---
function checkWinCondition() {
    if (gameWon || timeUp) return false;
    const targetCells = $('#game-table .target-cell');
    if (targetCells.length !== 9) return false;
    let allCorrect = true;
    for (let i = 0; i < targetCells.length; i++) {
        const cell = targetCells[i];
        const img = cell.querySelector('img');
        if (!img) { allCorrect = false; break; }
        const expectedCellId = img.getAttribute('data-correct-cell');
        const currentCellId = cell.id;
        const currentAngle = ($(img).data('angle') || 0) % 360;
        if (expectedCellId !== currentCellId || currentAngle !== 0) {
            allCorrect = false;
            break;
        }
    }
    if (allCorrect) {
        console.log('Game Won!');
        gameWon = true;
        timeUp = false;
        stopTimer();
        $('#game-table').addClass('game-won').removeClass('game-lost');
        $('#game-table img, #image-list img').attr('draggable', false).css('cursor', 'default');
        if (gameMode === 'classic') {
            $('#final-time').text(getFinalTime());
        } else {
            const usedSeconds = countdownDuration - timerSecondsRemaining;
            const minutes = Math.floor(usedSeconds / 60);
            const seconds = Math.floor(usedSeconds % 60);
            $('#final-time').text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
        $('#winModal').modal('show');
    }
    return allCorrect;
}

// --- Hàm xáo trộn ---
function shuffleImages() {
    var parent = $("#image-list");
    var cells = parent.children('.source-cell');
    if (cells.length === 0) return;

    var tempCells = [];
    cells.each(function () {
        tempCells.push($(this).detach());
    });

    while (tempCells.length) {
        parent.append(tempCells.splice(Math.floor(Math.random() * tempCells.length), 1)[0]);
    }

    parent.find('.source-cell img').each(function () {
        var randomRotation = getRandomRotationAngle();
        $(this).css('transform', 'rotate(' + randomRotation + 'deg)');
        $(this).data('angle', randomRotation);
    });
    console.log("Shuffled images for:", currentPuzzleId);
}

// --- Hàm lấy góc xoay ngẫu nhiên ---
function getRandomRotationAngle() {
    var angles = [0, 90, 180, 270];
    return angles[Math.floor(Math.random() * angles.length)];
}

// --- Các hàm xử lý Drag and Drop ---
function startDrag(event) {
    if (gameWon || timeUp) { event.preventDefault(); return; }
    draggedElement = event.target;
    event.dataTransfer.setData('imageId', draggedElement.id);
    setTimeout(() => {
        if (draggedElement) draggedElement.classList.add('dragging');
    }, 0);
}

function allowDrop(event, receiverCell) {
    if (gameWon || timeUp) return;
    const isReceiverEmpty = receiverCell.childElementCount === 0;
    const isNotSelfContainer = draggedElement ? receiverCell !== draggedElement.parentNode : true;
    if (isReceiverEmpty && isNotSelfContainer) {
        event.preventDefault();
        receiverCell.classList.add('drag-over-valid');
    }
}

function dragLeave(event, receiverCell) {
    if (receiverCell) receiverCell.classList.remove('drag-over-valid');
}

function endDrag(event) {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
    }
    $('.image-cell').removeClass('drag-over-valid');
    draggedElement = null;
}

function receiveData(event) {
    event.preventDefault();
    if (gameWon || timeUp) return;

    const id = event.dataTransfer.getData('imageId');
    const droppedImage = document.getElementById(id);
    let targetCell = event.target;

    $('.image-cell').removeClass('drag-over-valid');

    if (!droppedImage) return;

    if (targetCell.tagName === 'IMG') {
        targetCell = targetCell.parentNode;
    }

    if (targetCell.classList.contains('image-cell') &&
        targetCell.childElementCount === 0 &&
        (!draggedElement || targetCell !== draggedElement.parentNode)) {
        targetCell.appendChild(droppedImage);

        if ($(targetCell).closest('#game-table').length > 0 && !timerRunning) {
            console.log("Điều kiện bắt đầu timer thỏa mãn");
            startTimer();
        }
        if ($(targetCell).closest('#game-table').length > 0) {
            checkWinCondition();
        }
    }
}

// --- Hàm xử lý Touch Events cho kéo thả trên di động ---
function handleTouchStart(event) {
    if (gameWon || timeUp) {
        event.preventDefault();
        return;
    }

    const touch = event.touches[0];
    draggedElement = event.target.closest('img');
    if (!draggedElement) return;

    touchStartTime = Date.now();
    touchStartPos = { x: touch.clientX, y: touch.clientY };

    event.preventDefault();
    draggedElement.classList.add('dragging');
}

function handleTouchMove(event) {
    if (!draggedElement || gameWon || timeUp) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartPos.x;
    const deltaY = touch.clientY - touchStartPos.y;

    draggedElement.style.position = 'fixed';
    draggedElement.style.left = `${touch.clientX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${touch.clientY - draggedElement.offsetHeight / 2}px`;

    const targetCell = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.image-cell');
    if (targetCell && targetCell !== draggedElement.parentNode && targetCell.childElementCount === 0) {
        targetCell.classList.add('drag-over-valid');
    } else {
        $('.image-cell').removeClass('drag-over-valid');
    }

    event.preventDefault();
}

function handleTouchEnd(event) {
    if (!draggedElement || gameWon || timeUp) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartPos.x;
    const deltaY = touch.clientY - touchStartPos.y;
    const touchDuration = Date.now() - touchStartTime;

    draggedElement.style.position = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    draggedElement.classList.remove('dragging');
    $('.image-cell').removeClass('drag-over-valid');

    if (
        touchDuration < TOUCH_TAP_THRESHOLD &&
        Math.abs(deltaX) < TOUCH_MOVE_THRESHOLD &&
        Math.abs(deltaY) < TOUCH_MOVE_THRESHOLD
    ) {
        const currentAngle = ($(draggedElement).data('angle') || 0);
        const newAngle = (currentAngle + 90) % 360;
        $(draggedElement).css('transform', `rotate(${newAngle}deg)`);
        $(draggedElement).data('angle', newAngle);

        if ($(draggedElement).closest('#game-table').length > 0) {
            checkWinCondition();
        }
    } else {
        const targetCell = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.image-cell');
        if (
            targetCell &&
            targetCell.classList.contains('image-cell') &&
            targetCell.childElementCount === 0 &&
            targetCell !== draggedElement.parentNode
        ) {
            targetCell.appendChild(draggedElement);

            if ($(targetCell).closest('#game-table').length > 0 && !timerRunning) {
                console.log('Điều kiện bắt đầu timer thỏa mãn');
                startTimer();
            }
            if ($(targetCell).closest('#game-table').length > 0) {
                checkWinCondition();
            }
        }
    }

    draggedElement = null;
    event.preventDefault();
}

// --- Hàm tạo danh sách lựa chọn ảnh ---
function populateSelectionList() {
    const selectionList = $('#selection-list'); // Hoặc document.getElementById('selection-list');
    selectionList.empty(); // Xóa các lựa chọn cũ

    for (const puzzleId in puzzlesData) {
        const puzzle = puzzlesData[puzzleId];

        // Tạo div bọc ngoài với class puzzle-option
        const optionDiv = $('<div>') // Hoặc document.createElement('div');
            .addClass('puzzle-option')
            .attr('data-puzzle-id', puzzleId)
            .on('click', selectPuzzle); // Gán sự kiện click

        // Tạo ảnh thumbnail
        const imgElement = $('<img>') // Hoặc document.createElement('img');
            .attr('src', puzzle.thumbnail)
            .attr('alt', `Chọn ${puzzle.name}`);
            // Không cần data-puzzle-id ở đây nữa vì đã có ở div cha

        // Tạo tên puzzle
        const nameP = $('<p>').text(puzzle.name); // Hoặc document.createElement('p');

        optionDiv.append(imgElement).append(nameP);

        if (puzzleId === currentPuzzleId) {
            optionDiv.addClass('active-puzzle'); // Thêm class active-puzzle cho lựa chọn hiện tại
        }
        selectionList.append(optionDiv);
    }
}

// --- Hàm xử lý khi chọn bộ ảnh mới ---
function selectPuzzle(event) {
    // event.target có thể là img hoặc p, nên lấy data-puzzle-id từ parent .puzzle-option
    const selectedPuzzleOption = $(event.currentTarget); // jQuery: event.currentTarget là element gán sự kiện
    // Hoặc Vanilla JS: const selectedPuzzleOption = event.currentTarget;

    const selectedId = selectedPuzzleOption.data('puzzle-id'); // jQuery
    // Hoặc Vanilla JS: const selectedId = selectedPuzzleOption.getAttribute('data-puzzle-id');

    if (selectedId === currentPuzzleId) return; // Không làm gì nếu chọn lại cái đang active

    currentPuzzleId = selectedId;

    // Xóa class 'active-puzzle' khỏi tất cả các lựa chọn
    $('.puzzle-option').removeClass('active-puzzle'); // jQuery
    // Hoặc Vanilla JS:
    // document.querySelectorAll('.puzzle-selection-grid .puzzle-option').forEach(opt => opt.classList.remove('active-puzzle'));

    // Thêm class 'active-puzzle' cho lựa chọn mới
    selectedPuzzleOption.addClass('active-puzzle'); // jQuery
    // Hoặc Vanilla JS: selectedPuzzleOption.classList.add('active-puzzle');

    resetGame(); // Tải lại game với bộ hình mới
}

// --- Hàm Reset và Tải bộ ảnh mới ---
function resetAndLoadPuzzle(puzzleId) {
    console.log("Đang tải bộ ảnh:", puzzleId);
    const puzzle = puzzlesData[puzzleId];
    if (!puzzle) { console.error("Không tìm thấy bộ ảnh:", puzzleId); return; }

    $('#game-table').removeClass('game-won game-lost');
    $('#game-table .target-cell').empty();

    $('.reference-image').attr('src', puzzle.reference).attr('alt', `Ảnh gốc ${puzzle.name}`);

    const imageList = $('#image-list');
    imageList.empty();

    if (!puzzle.pieces || puzzle.pieces.length !== 9) {
        console.error("Dữ liệu mảnh ghép không hợp lệ cho:", puzzleId);
        imageList.html('<p style="color: red;">Lỗi tải mảnh ghép!</p>');
        return;
    }

    puzzle.pieces.forEach((pieceSrc, index) => {
        const cellId = `cell-${index}`;
        const imgId = `${puzzleId}-image${String(index + 1).padStart(2, '0')}`;

        const imgDOM = $('<img>')
            .attr('src', pieceSrc)
            .attr('id', imgId)
            .attr('data-correct-cell', cellId)
            .get(0);

        imgDOM.draggable = true;
        imgDOM.ondragstart = startDrag;
        imgDOM.ondragend = endDrag;
        imgDOM.ontouchstart = handleTouchStart;
        imgDOM.ontouchmove = handleTouchMove;
        imgDOM.ontouchend = handleTouchEnd;

        const cellDOM = $('<div>')
            .addClass('image-cell source-cell')
            .append(imgDOM)
            .get(0);

        cellDOM.ondragover = (e) => allowDrop(e, cellDOM);
        cellDOM.ondrop = (e) => receiveData(e);
        cellDOM.ondragleave = (e) => dragLeave(e, cellDOM);

        imageList.append(cellDOM);
    });

    shuffleImages();
    $('#image-list img').css('cursor', 'grab');
    console.log("Đã tải xong bộ ảnh:", puzzleId);
}

// --- Hàm Reset Game Tổng Quát ---
function resetGame() {
    console.log("Resetting game...");
    gameWon = false;
    timeUp = false;
    timerRunning = false;
    draggedElement = null;

    stopTimer();
    startTime = null;
    timerSecondsRemaining = 0;

    if (gameMode === 'classic') {
        $('#timer-display').text('Thời gian: 00:00');
    } else {
        let secondsValue = parseInt($('#countdown-seconds').val()) || 45;
        secondsValue = Math.max(20, Math.min(60, secondsValue));
        countdownDuration = secondsValue;
        timerSecondsRemaining = countdownDuration;
        displayTime(timerSecondsRemaining);
        $('#countdown-value').text(countdownDuration);
    }

    resetAndLoadPuzzle(currentPuzzleId);
}

// --- Document Ready ---
$(document).ready(function () {
    $('#image-list img').each(function () {
        const imgDOM = $(this).get(0);
        if (!imgDOM.ondragstart) imgDOM.ondragstart = startDrag;
        if (!imgDOM.ondragend) imgDOM.ondragend = endDrag;
        if (!imgDOM.ontouchstart) imgDOM.ontouchstart = handleTouchStart;
        if (!imgDOM.ontouchmove) imgDOM.ontouchmove = handleTouchMove;
        if (!imgDOM.ontouchend) imgDOM.ontouchend = handleTouchEnd;
    });
    $('#image-list .source-cell').each(function () {
        const cellDOM = $(this).get(0);
        if (!cellDOM.ondragover) cellDOM.ondragover = (e) => allowDrop(e, cellDOM);
        if (!cellDOM.ondrop) cellDOM.ondrop = (e) => receiveData(e);
        if (!cellDOM.ondragleave) cellDOM.ondragleave = (e) => dragLeave(e, cellDOM);
    });

    populateSelectionList();
    shuffleImages();

    $('input[name="gameMode"]').change(function () {
        gameMode = $(this).val();
        console.log("Chế độ chơi đổi thành:", gameMode);
        if (gameMode === 'countdown') {
            $('#countdown-duration-group').slideDown();
        } else {
            $('#countdown-duration-group').slideUp();
        }
        resetGame();
    });

    $('#countdown-seconds').on('input', function () {
        $('#countdown-value').text($(this).val());
    });

    $('#countdown-seconds').on('change', function () {
        if (gameMode === 'countdown') {
            console.log("Countdown duration changed, resetting game.");
            resetGame();
        }
    });
});

// --- SỰ KIỆN CLICK XOAY ẢNH (Chỉ cho desktop) ---
$(document).on('click', '.image-cell img', function (e) {
    if (gameWon || timeUp) return;
    if ($(this).hasClass('dragging')) return;
    if ('ontouchstart' in window) return;

    var currentAngle = ($(this).data('angle') || 0);
    var newAngle = (currentAngle + 90) % 360;
    $(this).css('transform', 'rotate(' + newAngle + 'deg)');
    $(this).data('angle', newAngle);

    if ($(this).closest('#game-table').length > 0) {
        checkWinCondition();
    }
});