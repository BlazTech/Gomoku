const tableCells = 21;
const tableRows = 21;
let tableMatrix = [];
const table = document.querySelector("table");
let sign = "O";

function updateDisplayTable() {
    for (let row = 0; row < tableRows; row++) {
        for (let cell = 0; cell < tableCells; cell++) {
            if (tableMatrix[row][cell] !== "E") {
                table.rows[row].cells[cell].innerText = tableMatrix[row][cell];
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
        updateTableMatrix(row, cell);
    } else {
        let cpu = computerMove();
        updateTableMatrix(cpu[0], cpu[1]);
    }
    if (sign === "O") {
        sign = "X";
    } else {
        sign = "O";
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
                "XXXX": 20000,
                "OOOO": 10000,
                "XXXE": 500,
                "OOOE": 200,
                "XXEE": 100,
                "XXEB": 50,
                "OEEE": 25
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

// table creation
for (let row = 0; row < tableRows; row++) {
    tableMatrix.push([]);
    const tr = document.createElement("tr");
    table.append(tr);

    for (let cell = 0; cell < tableCells; cell++) {
        tableMatrix[row].push("E");
        const th = document.createElement("th");
        tr.append(th);
    }
}

// event listeners
for (let row of table.rows) {
    for (let cell of row.cells) {
        cell.addEventListener("click", () => {
            handleInput(row.rowIndex, cell.cellIndex);
        })
    }
}
