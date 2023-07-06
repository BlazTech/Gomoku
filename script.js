const cells = 21;
const rows = 21;
let tableMatrix = [];
const table = document.querySelector("table");
let sign = "O"

function updateTable() {
    for (let row = 0; row < rows; row++) {
        for (let cell = 0; cell < cells; cell++) {
            if (tableMatrix[row][cell] !== "E") {
                table.rows[row].cells[cell].innerText = tableMatrix[row][cell];
            }
        }
    }
}

function updateTableMatrix(row, cell) {

    if (tableMatrix[row][cell] === "E") {

        tableMatrix[row][cell] = sign;

        if (sign === "O") {
            sign = "X";
        } else {
            sign = "O";
        }
    }

    updateTable();
}

// table creation
for (let r = 0; r < rows; r++) {
    tableMatrix.push([]);
    const tr = document.createElement("tr");
    table.append(tr);

    for (let c = 0; c < cells; c++) {
        tableMatrix[r].push("E");
        const th = document.createElement("th");
        tr.append(th);
    }
}

// event listeners
for (let row of table.rows) {
    for (let cell of row.cells) {
        cell.addEventListener("click", () => {
            updateTableMatrix(row.rowIndex, cell.cellIndex);
        })
    }
}

// ai

//B == wall
//E == empty

function computerMove(sign) {
    function getValue(row, cell) {
        let xLineLeft = "";
        let xLineRight = "";
        let yLineUp = "";
        let yLineDown = "";

        
        if (tableMatrix[row][cell] === "E") {

            // x left
            for (let i = 1; i <= 4; i++) {
                if (tableMatrix[row][cell - i] != undefined) {
                    xLineLeft += tableMatrix[row][cell - i];
                } else {
                    xLineLeft += "B"
                }
            } 

            // x right
            for (let i = 1; i <= 4; i++) {
                if (tableMatrix[row][cell + i] != undefined) {
                    xLineRight += tableMatrix[row][cell + i];
                } else {
                    xLineRight += "B";
                }
            }

            // y up
            for (let i = 1; i <= 4; i++) {
                try {
                    yLineUp += tableMatrix[row - i][cell];
                } catch {
                    yLineUp += "B";
                }
            }

            // y down
            for (let i = 1; i <= 4; i++) {
                try {
                    yLineDown += tableMatrix[row + i][cell];
                } catch {
                    yLineDown += "B";
                }
            } 

            console.log("LEFT:", xLineLeft);
            console.log("RIGHT:", xLineRight);
            console.log("UP:", yLineUp);
            console.log("DOWN:", yLineDown);

        }
    }

    // for (let row = 0; row < rows; row++) {
    //     for (let cell = 0; cell < cells; cell++) {
    //         getValue(row, cell);
    //     }
    // }
    
    getValue(0, 0);
}
