class GameOfLife {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // TODO: Create and return an 2D Array
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    console.log(this.height, this.width)
    const myBoard = new Array(this.height).fill(0)
    return myBoard.map( () => {
      const cell = new Array(this.width).fill(0)
      return cell
    })
  }


  //getCell
  getCell(row, col) {
    if (col < 0 || row < 0 || this.board.length <= row) return 0
    if (this.board[row].length <= col) return 0
    return this.board[row][col]
  }

  //setCell
  setCell(val, row, col) {
    if (col < 0 || row < 0 || this.board.length <= row) return
    if (this.board[row].length <= col) return
    this.board[row][col] = val
  }

  //toggleCell
  toggleCell(row, col) {
    const state = this.getCell(row, col)
    return state ? 0 : 1
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
    const r = row
    const c = col
    let neighbors = 0
    neighbors += this.getCell(r-1, c)
    neighbors += this.getCell(r+1, c)
    neighbors += this.getCell(r, c-1)
    neighbors += this.getCell(r, c+1)
    neighbors += this.getCell(r-1, c-1)
    neighbors += this.getCell(r-1, c+1)
    neighbors += this.getCell(r+1, c-1)
    neighbors += this.getCell(r+1, c+1)
    return neighbors
  }


  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors

    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i]
      for (let j = 0; j < row.length; j++) {
        const neighbors = this.livingNeighbors(i, j)
        const state = this.getCell(i, j)
        if ( !state && neighbors === 3) {
          newBoard[i][j] = this.toggleCell(i, j)
        }
        else if (state && (neighbors > 3 || neighbors < 2)) {
          newBoard[i][j] = this.toggleCell(i, j)
        }
        else {
          newBoard[i][j] = state
        }
      }
    }
    this.board = newBoard;
  }
}
