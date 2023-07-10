function startGame(cells, rows) {
    const tableContainer = document.querySelector(".table-container");
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.style.borderSpacing = "1px";
    tableContainer.append(table);

    const tableCells = cells;
    const tableRows = rows;

    let tableMatrix = [];
    let sign = "O";

    function updateDisplayTable() {
        for (let row = 0; row < tableRows; row++) {
            for (let cell = 0; cell < tableCells; cell++) {
                if (tableMatrix[row][cell] !== "E") {
                    table.rows[row + 1].cells[cell + 1].innerText = tableMatrix[row][cell];
                }
            }
        }
    }

    function updateTableMatrix(row, cell) {

        if (tableMatrix[row][cell] === "E") {
            tableMatrix[row][cell] = sign;
        }

        updateDisplayTable();
    }

    function handleInput(row, cell) {
        if (sign === "O") {
            if (tableMatrix[row][cell] === "E") {
                updateTableMatrix(row, cell);
                sign = "X";
                const computer = computerMove();
                updateTableMatrix(computer[0], computer[1]);
                sign = "O";
            }
        }
    }

    // X = computer sign
    // O = player sign
    // B == wall
    // E == empty
    // G == inspected cell

    function computerMove() {
        function getValue(row, cell) {
            let value = 0;

            if (tableMatrix[row][cell] === "E") {

                function makeLine(rowMove, cellMove) {
                    let line = ""
                    for (let i = -4; i < 5; i++) {
                        try {
                            if (tableMatrix[row + (i * rowMove)][cell + (i * cellMove)] !== undefined) {
                                if (i == 0) {
                                    line += "G";
                                } else {
                                    line += tableMatrix[row + (i * rowMove)][cell + (i * cellMove)];
                                }
                            } else {
                                line += "B";
                            }
                        } catch {
                            line += "B";
                        }
                    }
                    return line;
                }


                let xLine = makeLine(0, 1);
                let yLine = makeLine(1, 0);
                let leftDg = makeLine(1, 1);
                let rightDg = makeLine(-1, 1);


                const cellValues = {
                    "XXXX": 2000000,
                    "OOOO": 100000,
                    "XXXE": 10000,
                    "OOOE": 500,
                    "XXEE": 100,
                    "OEEE": 50,
                    "XXEB": 40
                }

                const patternValues = {
                    "XGXXX": 2000000,
                    "XXGXX": 2000000,
                    "XXXGX": 2000000,
                    "OGOOO": 150000,
                    "OOGOO": 150000,
                    "OOOGO": 150000,
                    "OOGO": 200,
                    "OGOO": 200
                }

                function lineCheck(line) {
                    let first = line.split("G")[0].split("").reverse().join("");
                    let second = line.split("G")[1];

                    if (first in cellValues) {
                        value += cellValues[first];
                    }
                    if (second in cellValues) {
                        value += cellValues[second];
                    }
                    for (let key in patternValues) {
                        if (line.includes(key)) {
                            value += patternValues[key];
                        }
                    }
                }

                lineCheck(xLine);
                lineCheck(yLine);
                lineCheck(leftDg);
                lineCheck(rightDg);

            }

            return value;
        }

        let bestMove = [10, 10];
        let bestMoveValue = 0;

        for (let row = 0; row < tableRows; row++) {
            for (let cell = 0; cell < tableCells; cell++) {
                if (getValue(row, cell) > bestMoveValue) {
                    bestMove = [row, cell];
                    bestMoveValue = getValue(row, cell);
                    console.log(bestMove, bestMoveValue);
                }
            }
        }
        return bestMove;
    }

    // tableMatrix creation
    for (let row = 0; row < tableRows; row++) {
        tableMatrix.push([]);

        for (let cell = 0; cell < tableCells; cell++) {
            tableMatrix[row].push("E");
        }
    }

    //html table creation
    for (let row = 0; row < tableRows + 1; row++) {
        const tr = document.createElement("tr");
        table.append(tr);

        for (let cell = 0; cell < tableCells + 1; cell++) {
            const th = document.createElement("th");
            //cells in first row, first cells of each row
            if (row === 0 && cell !== 0) {
                th.innerText = String(cell - 1);
            } else if (row !== 0 && cell === 0) {
                th.innerText = String(row - 1);
            }
            tr.append(th);
        }
    }

    // event listeners
    for (let row of table.rows) {
        for (let cell of row.cells) {
            if (row.rowIndex !== 0 && cell.cellIndex !== 0) {
                cell.addEventListener("click", () => {
                    handleInput(row.rowIndex - 1, cell.cellIndex - 1)
                });
            }
        }
    }
}

startGame(21, 21);