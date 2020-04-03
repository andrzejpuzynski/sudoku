module.exports = function solveSudoku(matrix) {
  var inputArray = matrix
  
  var outputArray = [];


  //  1 STEP OF ALGORITHM: CHANGING ZEROES INTO ALL POSSIBLE VALUES
  console.clear();
  
  const checkCell = (row, column, array) => {
    var outputCheckedCell = [];
  
    var arrayRow = array[row];
    var arrayColumn = array.map((i, idx) => (i = i[column]));
  
    function validateSection(row, col, array) {
      var arraySection = [];
      var xrow = Math.floor(row / 3) * 3;
      var xcol = Math.floor(col / 3) * 3;
  
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          arraySection.push(array[xrow + i][xcol + j]);
        }
      }
      return arraySection;
    }
  
    arraySection = validateSection(row, column, array);
  
    for (var r = 1; r < 10; r++) {
      if (
        !arrayRow.includes(r) &&
        !arrayColumn.includes(r) &&
        !arraySection.includes(r)
      ) {
        outputCheckedCell.push(r);
      }
    }
    return outputCheckedCell.length === 1
      ? outputCheckedCell[0]
      : outputCheckedCell;
  };
  
  // function change zeros onto possible values
  for (i = 0; i < 9; i++) {
    outputArray.push([]);
    inputArray[i].map((item, idx) => {
      inputArray[i][idx] != 0
        ? outputArray[i].push(inputArray[i][idx])
        : outputArray[i].push(checkCell(i, idx, inputArray));
    });
  }
  
  
  // 2: REDUCING ELEMENTS IN ROW 
  
  const filteredAndFlatenRow = (row, column, array) => {
    return array[row].filter((x, idx) => idx != column)
                     .reduce((a, b) => a.concat(b), []);
  };
  
  function reduceRow(array) {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        array[i][j].length > 1
          ? array[i][j].map((item) =>
              filteredAndFlatenRow(i, j, array).includes(item)
                ? null
                : outputArray[i][j] = item
            )
          : null;
      }
    }
  }
  
  // 3: REDUCING ELEMENTS IN COLUMN

  const filteredAndFlatenColumn = (row, column, array) => {
    return array.filter((x, idx) => idx != column)
                .map(x => x = x[column])
                .reduce((a, b) => a.concat(b), []);
  };
  
  
  function reduceColumn(array) {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        array[i][j].length > 1
          ? array[i][j].map((item) => 
              filteredAndFlatenColumn(i, j, array).includes(item)
                ? null
                : outputArray[i][j] = item
            )
          : null;
      }  
    }
  }
  
  
  // 4: REDUCING ELEMENTS IN COLUMN
  
  const filteredAndFlatenSection = (row, column, array) => {
      var filteredArray = [];
      var xrow = Math.floor(row / 3) * 3;
      var xcol = Math.floor(column / 3) * 3;
  
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          !((xrow + i == row) && (xcol + j == column)) ?
          filteredArray.push(array[xrow + i][xcol + j]) :
          null
        }
      }
    return filteredArray.reduce((a, b) => a.concat(b), [])
  };
  
  function reduceSection(array) {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        array[i][j].length > 1
          ? array[i][j].map((item) => 
              filteredAndFlatenSection(i, j, array).includes(item)
                ? null
                : outputArray[i][j] = item          
            )
         : null;
      }  
    }
  }
  
  // 5; RUNNING SECOND ALGORITHM
  reduceRow(outputArray);
  reduceColumn(outputArray);
  reduceSection(outputArray);
  reduceRow(outputArray);
  reduceColumn(outputArray);
  reduceSection(outputArray);
  reduceRow(outputArray);
  reduceColumn(outputArray);
  reduceSection(outputArray);
  reduceRow(outputArray);
  reduceColumn(outputArray);
  reduceSection(outputArray);
  reduceRow(outputArray);
  reduceColumn(outputArray);
  reduceSection(outputArray);

  return outputArray
}
