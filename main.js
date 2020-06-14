const width = 25;
const height = 20; // width and height dimensions of the board
let intervalId = null
/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(height, width);


/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);


/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //
  // To find all the <td>s in the table, you might query the DOM for them, or you
  // could choose to collect them when we create them in createTable.

  tds.forEach( td => {
    if (gol.getCell(td.dataset.row, td.dataset.col)) {
      td.classList.add('alive')
    }
    else {
      td.classList.remove('alive')
    }
  })
  //
  // HINT:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
}


/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  // TODO: Toggle clicked cell (event.target) and paint
  const targ = event.target
  if (targ.tagName !== 'TD') return
  const row  = Number(targ.dataset.row)
  const col = Number(targ.dataset.col)
  const val = gol.board[row][col]
  gol.board[row][col] = val ? 0 : 1
  targ.classList.toggle('alive')
});

document.getElementById("step_btn").addEventListener("click", event => {
  // TODO: Do one gol tick and paint
  gol.tick()
  paint()
});

document.getElementById("play_btn").addEventListener("click", event => {
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
  // HINT:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
  if (event.target.innerText === 'Play') event.target.innerText = 'Pause'
  intervalId = setInterval(() => {
    gol.tick()
    paint()
  }, 20)
});

document.getElementById("random_btn").addEventListener("click", event => {
  // TODO: Randomize the board and paint
  gol.board.forEach( (row, rowIdx) => {
    row.forEach( (col, colIdx) => {
      gol.board[rowIdx][colIdx] = Math.random() > 0.5 ? 1 : 0
    })
  })
  paint()
});

document.getElementById("clear_btn").addEventListener("click", event => {
  // TODO: Clear the board and paint
  // event.target.previousSibling.previousSibling.innerText = 'Play'
  event.target.previousElementSibling.previousElementSibling.innerText = 'Play'
  clearInterval(intervalId)
  gol.board.forEach( (row, rowIdx) => {
    row.forEach( (col, colIdx) => {
      gol.board[rowIdx][colIdx] = 0
    })
  })
  paint()
});
