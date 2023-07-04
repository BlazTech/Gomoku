const columns = 21;
const rows = 21;
let tableMatrix = [];

const table = document.querySelector("table");
for (let r = 0; r < rows; r++) {
    tableMatrix.push([]);
    const tr = document.createElement("tr");
    table.append(tr);

    for (let c = 0; c < columns; c++) {
        tableMatrix[r].push("e");
        const th = document.createElement("th");
        tr.append(th);
    }
}

for (let row of table.rows) {
    for (let cell of row.cells) {
        cell.addEventListener("click", (e) => {
            console.log(row.rowIndex, cell.cellIndex);
        })
    }
}
