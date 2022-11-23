'use strict'

// ----global variables----
const MINE = '💣'

var gBoard = []

var cell = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

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
    renderBoard(gBoard)
    console.log(gBoard);
}


function buildBoard() {
    // -Builds the board
    var board = []
    var mines = gLevel.MINES

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = cell
        }
        // Set mines at random locations

    }


    return board
    // Call setMinesNegsCount()
    // Return the created board
}

function renderBoard(board) {
    // Render the board as a <table> to the page
    var elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var value = (cell.isMine) ? MINE : ''
            // var className = (currCell) ? 'occupied' : ''
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'

            strHTML += `<td ${cellData}
          onclick="cellClicked(this,${i},${j})">
          ${value}</td>`
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}

function createCompareBoard() {

}

function createMinesArray() {
    var minesArray = []
    var minesCount = gLevel.MINES

    for (var i = 0; i < gLevel.SIZE ** 2; i++) {
        var value = (minesCount > 0) ? MINE : ''
        minesArray.push(value)
        minesCount--
    }
}

function drawNums(array) {
    var idx = getRandomInt(0, array.length)
    array.splice(idx, 1)
    return
}


// setMinesNegsCount(board)
// Count mines around each cell
// set the cell's minesAroundCount.


// cellClicked(elCell, i, j){
// Called when a cell (td) is clicked

// }

// cellMarked(elCell)
//Called on right click to mark a cell (suspected to be a mine)
//Search the web how to hide the context menu on right click

// checkGameOver()
//Game ends :
// 1- when all mines are marked,
// 2- all the other cells are shown

// expandShown(board, elCell, i, j)
// start with a basic-only opens the non-mine 1st degree neighbors
//When user clicks a cell with no mines around, we need to open that cell, but also its neighbors.

// console.log(getEmptyCell());
function getEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = { i: i, j: j }
            if (cell.isMine === false) emptyCells.push(cell)
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randIdx]
}















// console.log(getEmptyCell(gBoard));
function getEmptyRandCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board.length; j++) {
            var location = { i: i, j: j }
            var currCell = board[i][j]
            if (currCell.isMine === '') {
                emptyCells.push(location)
            }

        }
        var randIdx = getRandomInt(0, emptyCells.length)
    } return emptyCells[randIdx]
}