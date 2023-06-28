const columns = 21;
const rows = 21;

const table = document.querySelector("table");

for (let i = 1; i <= rows; i++) {
    const tr = document.createElement("tr");
    table.append(tr);

    for (let i = 1; i <= columns; i++) {
        const th = document.createElement("th");
        tr.append(th);
    }
}