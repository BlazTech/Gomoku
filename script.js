const columns = 21;
const rows = 21;
let tableMatrix = [];

const table = document.querySelector("table");
for (let i = 0; i < rows; i++) {
    tableMatrix.push([]);
    const tr = document.createElement("tr");
    table.append(tr);

    for (let j = 0; j < columns; j++) {
        tableMatrix[i].push("e");
        const th = document.createElement("th");
        tr.append(th);
    }
}
