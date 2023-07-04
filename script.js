const cells = 21;
const rows = 21;
let tableMatrix = [];
const table = document.querySelector("table");
let sign = "O"

function updateTable() {
    for (let row=0; row < rows; row++) {
        for (let cell=0; cell < cells; cell++) {
            table.rows[row].cells[cell].innerText = tableMatrix[row][cell];
        }
    }
}

function updateTableMatrix(row, cell) {
    
    if (tableMatrix[row][cell] === "") {

        tableMatrix[row][cell] = sign;
    
        if (sign === "O") {
            sign = "X";
        } else {
            sign = "O";
        }        
    }

    updateTable();
}

//table creation
for (let r = 0; r < rows; r++) {
    tableMatrix.push([]);
    const tr = document.createElement("tr");
    table.append(tr);

    for (let c = 0; c < cells; c++) {
        tableMatrix[r].push("");
        const th = document.createElement("th");
        tr.append(th);
    }
}

//event listeners
for (let row of table.rows) {
    for (let cell of row.cells) {
        cell.addEventListener("click", () => {
            updateTableMatrix(row.rowIndex, cell.cellIndex);
        })
    }
}
