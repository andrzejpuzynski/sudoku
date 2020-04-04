module.exports = function solveSudoku(matrix) {
  
  var inputArray = matrix;
  var outputArray = inputArray;

  // --------------------------------   check if n not in particular row
  const usedInRow = (row, n, array) => {
    for (i = 0; i < 9; i++) {
      if (array[row][i] == n) {
        return true;
      }
    }
    return false;
  }

  // -------------------------------   check if n not in particular column
  const usedInColumn = (col, n, array) => {
    for (i = 0; i < 9; i++) {
      if (array[i][col] == n) {
        return true;
      }
    }
    return false;
  }

  // -------------------------------   check if n not in particular box
  const usedInBox = (boxStartRow, boxStartCol, n, array) => {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (array[i + boxStartRow][j + boxStartCol] == n) {
          return true;
        }
      }
    }
    return false;
  }

  // --------------------------------  check if n can be placed in cell
  const isSafe = (row, col, n, array) => {
    if (!usedInRow(row, n, array) &&
      !usedInColumn(col, n, array) &&
      !usedInBox(row - row % 3, col - col % 3, n, array)) {
      return true;
    }
    return false;
  }

  // --------------------------------  solve Sudoku
  const solveSudoku = (array) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (array[i][j] == 0) {
          for (let k = 1; k <= 9; k++) {
            if (isSafe(i, j, k, array)) {
              array[i][j] = k;
              if (solveSudoku(array)) {
                return true;
              } else {
                array[i][j] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

// --------------------------------  run
  solveSudoku(inputArray);
  return outputArray;

}