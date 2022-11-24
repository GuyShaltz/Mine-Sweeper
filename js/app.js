'use strict'

// ----global variables----
const MINE = '💣'
const FLAG = '🚩'
var gInterval

var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2,
    life: 1
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    shown: 0,
    markedCount: 0,
    mineCells: []

}
var gShownCellsCount

// ----FUNCTIONS:----
function initGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        shown: gLevel.MINES,
        markedCount: 0,
        life: gLevel.life,
        mineCells: []
    }
    gBoard = buildBoard()
    console.log(gBoard);
    renderBoard(gBoard)
}

function buildBoard() {
    gBoard = draftBoard()
    for (var i = 0; i < gLevel.SIZE; i++) {

        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine) gGame.mineCells.push({ i: i, j: j })
            cell.minesAroundCount = setMinesNegsCount(i, j, gBoard)
        }
    }
    return gBoard
}

function draftBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    var minesCounter = gLevel.MINES
    for (var q = 0; q < minesCounter; q++) {
        var randCell = getRandomInt(0, (gLevel.SIZE ** 2))
        var randIdx = getRandMatIdx(randCell, board)
        if (board[randIdx.i][randIdx.j].isMine) minesCounter++
        board[randIdx.i][randIdx.j].isMine = true
    }

    return board
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) negsCount++
        }
    }
    return negsCount

}

function renderBoard(board) {
    // console.table(board)
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var cellValue = ''
            if (cell.isShown) {
                cellValue = (cell.isMine) ? MINE : cell.minesAroundCount

            }
            strHTML += `<td id ${i}-${j} oncontextmenu="cellMarked(this,${i},${j})" onclick="cellClicked(this,${i},${j})" >
            <span>${cellValue}</span></td >`
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

}

function getRandMatIdx(randCellIdx, board) {
    var counter = randCellIdx
    while (counter >= 0) {
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {

                var idx = { i: i, j: j }

                if (counter === 0) return idx

                counter--
            }
        }
    } return idx

}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    var cellValue = ''
    if (cell.isMarked) return
    if (!cell.isShown) { // if not false= true
        cell.isShown = true
        if (!cell.isMine) { //// if not false= true
            gGame.shown++
            if (cell.minesAroundCount !== 0) cellValue = cell.minesAroundCount
        } else {
            cellValue = MINE
            // gGame.minesCount++
            gGame.life--
            checkGameOver()
        }
        elCell.classList.add('shown')
        renderCell(elCell, cellValue)
    } return
}

function renderCell(elCell, value) {
    var elSpan = elCell.querySelector('span')
    elSpan.innerText = value
}

function startTimer() {


    gInterval = setInterval(setTimer, 1000)

}

function setTimer() {
    //sec
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }

}

function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isShown) return
    if (cell.isMarked) {
        cell.isMarked = false
        gGame.markedCount--
        renderCell(elCell, '')
    } else {

        cell.isMarked = true
        if (cell.isMine) gGame.markedCount++
        checkGameOver()
        renderCell(elCell, FLAG)
    }
}

function setLevel(difficulty) {
    switch (difficulty) {
        case ('Beginner'):
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.life = 2
            break;
        case ('Medium'):
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gLevel.life = 3
            break;
        case ('Advanced'):
            gLevel.SIZE = 12
            gLevel.MINES = 32
            gLevel.life = 3
            break;
        default:
            gLevel.SIZE = 2
            gLevel.MINES = 4
            gLevel.life = 1
    }
    initGame()
}

function checkGameOver() {
    var cellCount = gLevel.SIZE ** 2
    if (gGame.markedCount === gLevel.MINES || cellCount - gLevel.shown === gLevel.MINES) {
        console.log('Winner');

    } else if (gGame.life === 0) {
        endGame()
        console.log('GameOver');
    }
    else return

}

function endGame() {
    gGame.isOn = false
    clearInterval(gInterval)
    for (var i = 0; i < gGame.mineCells; i++) {
        var mineIdx = gGame.mineCells[i]
        var cell = gBoard[mineIdx.i][mineIdx.j]
    }
}

function revealMines() {
    for (var i = 0; i < gGame.mineCells; i++) {
        var pos = gGame.mineCells[i]
        var cell = gBoard[pos.i][pos.j]

        cell.isShown = true
        var elCell = document.querySelector('id' + pos.i + pos.j)


    }
}



function expandShown(board, currI, currJ) {
    for (var i = currI - 1; i <= currI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = currJ - 1; j <= currJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            var cell = board[i][j];
            if (!cell.isShown && !cell.isMarked) {
                gShownCellsCount++;
                cell.isShown = true;
                if (board[i][j].minesAroundCount === 0) {
                    expandShown(board, i, j);
                }
            }
        }
    }
    return gShownCellsCount;
}





function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('contextmenu', e => e.preventDefault());