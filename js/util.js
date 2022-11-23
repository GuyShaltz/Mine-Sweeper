
// console.log('gameOfLife Board', createBoard());
///////////create matrica board --GAME OF LIFE//////////////
// function createBoard() {
//   var board = []
//   var length = 8
//   for (var i = 0; i < length; i++) {
//     board.push([])
//     for (var j = 0; j < length; j++) {
//       board[i][j] = (Math.random() > 0.5) ? LIFE : ''
//     }
//   }
//   return board
// }

////////////////render board --GAME OF LIFE///////////////////////////

// function renderBoard(board) {
//   // console.table(board)
//   var strHTML = ''
//   for (var i = 0; i < board.length; i++) {
//     strHTML += '<tr>'
//     for (var j = 0; j < board[0].length; j++) {
//       var cell = board[i][j]
//       var cellData = 'data-i="' + i + '" data-j="' + j + '"'
//       var mine = (cell.isMine) ? MINE : ''
//       var isShown = (cell.isShown) ? mine : ''
//       strHTML += `<td ${cellData}
//           onclick="onCellClicked(this,${i},${j})">
//           ${isShown}</td>`
//     }
//     strHTML += '</tr>\n'
//   }
//   // console.log(strHTML)
//   var elBoard = document.querySelector('.board')
//   elBoard.innerHTML = strHTML

// }

////////////copy matric when we want to update new board//////
var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(nums.shift())

function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

/////////////////// createObject///////////////////////
function createBalloon(idx) {
  return { id: idx + 1, speed: getRandomInt(5, 30), bottom: 0 }
}
////////////////////createObjects////////////////////
function createBalloons(count) {
  var balloons = []
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i)
    balloons.push(balloon)
  }
  return balloons
}



// put nums in array shuffle and pop one num at a time////
function resetNums() {
  gNums = []
  for (var i = 1; i <= maxCellValue; i++) {
    gNums.push(i)
  }
  gNums = shuffle(gNums)
}
function drawAndCountNum() {
  gDrawCount++
  return gNums.pop()

}
///////////////////////////////////////////////////////////

function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

// neighbors loop
// function countNegs(cellI, cellJ, mat) {
//   var negsCount = 0
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i >= mat.length) continue
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       if (i === cellI && j === cellJ) continue
//       if (j < 0 || j >= mat[i].length) continue
//       // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
//       if (mat[i][j]) negsCount++
//     }
//   }
//   return negsCount
// }

function onCellClicked(elTd, cellI, cellJ) {
  // when clicked checks if the cell have a class
  // if (elTd.classList.contains('occupied')) {
  //     console.log('hi');
  // }

  if (board[cellI][cellJ] === LIFE) {
    console.log('hi');
    board[cellI][cellJ] = SUPER_LIFE
    console.log(board);
    elTd.innerText = SUPER_LIFE
    blowUpNegs(cellI, cellJ, board)
  }
}

// how to change the header 
function changeHeader() {
  const elHeader = document.querySelector('h1');
  elHeader.innerText = 'I Love JS'
}

// change text in the button and mark all spans inside .box
function onMark(elBtn) {
  // change text in the button
  elBtn.innerText = (gIsMarked) ? 'Mark' : 'unMark'
  gIsMarked = !gIsMarked

  // mark all spans inside .box
  var elBoxSpans = document.querySelectorAll('.box span')
  for (var i = 0; i < elBoxSpans.length; i++) {
    var currSpan = elBoxSpans[i]
    currSpan.classList.toggle('mark')
  }
}

// show the modal and schedule its closing
function onOpenModal() {
  gElModal.style.display = 'block'
  setTimeout(onCloseModal, 5000)
}

//get a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getTime() {
  return new Date().toString().split(' ')[4];
}

// close the modal if escape is pressed
// console.log('ev.code:', ev.code);
function onHandleKey(ev) {
  if (ev.code === 'Escape') {
    onCloseModal()
  }
}

// change the image when hoverin on image
function onMouseOver(elImg) {
  elImg.src = "img/ca.png"
}
// change the image when stop hoverin on image
function onMouseOut(elImg) {
  elImg.src = "img/ninja.png"
}

//get random number
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}


function timer() {
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

// draw a random number
function drawValue() {
  var idx = getRandomInt(0, gNums.length)
  var num = gNums[idx]
  gNums.splice(idx, 1)
  return num

}

// Move the player by keyboard arrows
function onHandleKey(event) {
  const i = gGamerPos.i
  const j = gGamerPos.j
  //   console.log('event.key:', event.key)

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1)
      break
    case 'ArrowRight':
      moveTo(i, j + 1)
      break
    case 'ArrowUp':
      moveTo(i - 1, j)
      break
    case 'ArrowDown':
      moveTo(i + 1, j)
      break
  }
}

// Returns the class name for a specific cell
function getClassNamePos(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

// Add a ball to a random empty cell
function addBall() {
  var randCell = getRandomCell()
  board[randCell.i][randCell.j].gameElement = BALL
  renderCell(randCell, BALL_IMG)
  gBallOnBoardCounter++
  countGamerNgs()
}

// find empty cells on board
function getEmptyCells() {
  const emptyCells = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].type !== WALL && !board[i][j].gameElement) {
        emptyCells.push({ i, j })
      }
    }
  }
  return emptyCells
}

// function getEmptyRandCell() {
//   var emptyCells = []
//   for (var i = 0; i < board.length; i++) {

//     for (var j = 0; j < board[0].length; j++) {
//       var cell = { i: i, j: j }
//       var currCell = board[i][j]
//       if (currCell.gameElement === null && currCell.type === FLOOR) {
//         emptyCells.push(cell)
//       }

//     }
//     var randIdx = getRandomInt(0, emptyCells.length)
//   } return emptyCells[randIdx]
// }

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}