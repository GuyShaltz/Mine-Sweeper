'use strict'

// ----global variables----
const MINE = '💣'
const FLAG = '🚩'

var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// ----FUNCTIONS:----
function initGame() {
    gBoard = buildBoard()
    console.log(gBoard);
    renderBoard(gBoard)
}

function buildBoard() {
    gBoard = firstBoard()
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            cell.minesAroundCount = setMinesNegsCount(i, j, gBoard)
        }
    }
    return gBoard
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
            strHTML += `<td id ${i}-${j} onclick="cellClicked(this,${i},${j})">
            <span>${cellValue}</span></td >`
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

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

function firstBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    for (var q = 0; q < gLevel.MINES; q++) {
        var randCell = getRandomInt(0, gLevel.SIZE ** 2)
        var randIdx = getRandMatIdx(randCell, board)
        if (board[randIdx.i][randIdx.j].isMine) gLevel.MINES++
        board[randIdx.i][randIdx.j].isMine = true
    }

    return board
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    var cellValue = ''
    if (!cell.isShown) {
        cell.isShown = true
        if (!cell.isMine) {
            if (cell.minesAroundCount !== 0) cellValue = cell.minesAroundCount
        } else cellValue = MINE
        if (!elCell.classList.contains('shown')) elCell.classList.add('shown')
        renderCell(elCell, cellValue)
    } return
}

function renderCell(elCell, value) {
    var elSpan = elCell.querySelector('span')
    elSpan.innerText = value
}

// console.log(getEmptyRandCell(gBoard));
// function getEmptyRandCell(board) {
//     var emptyCells = []
//     for (var i = 0; i < board.length; i++) {

//         for (var j = 0; j < board[0].length; j++) {
//             var cell = { i: i, j: j }
//             var currCell = board[i][j]

//             emptyCells.push(cell)


//         }
//         var randIdx = getRandomInt(0, 16)
//     } return emptyCells[randIdx]
// }


function getRandMatIdx(randCellIdx, board) {
    var counter = randCellIdx
    while (counter > 0) {
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {

                var idx = { i: i, j: j }

                if (counter === 1) return idx

                counter--
            }
        }
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function timer() {
    document.addEventListener('click', () => {
        setInterval(timer, 1000);
    }, { once: true });

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






