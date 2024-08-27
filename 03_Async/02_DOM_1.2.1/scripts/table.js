const data = [
    { id: 1, name: "Bob", place: "Zürich" },
    { id: 2, name: "Melanie", place: "Zürich" },
    { id: 5, name: "Pascal", place: "Luzern" },
    { id: 3, name: "Lea", place: "Arth" },
    { id: 4, name: "Loris", place: "Bern" },
    { id: 8, name: "Daniel", place: "Rapperswil" },
    { id: 7, name: "Tamara", place: "Jona" }
  ];

function generateTable() {
    const table = document.querySelector("#table-content");

    for (let user of data) {
        const row = document.createElement("tr");

        generateCol(row, "th", user.id).setAttribute("scope", "row");
        generateCol(row, "td", user.name);
        generateCol(row, "td", user.place);

        table.appendChild(row);
    }
}

function generateCol(parent, tag, content) {
    const col = document.createElement(tag);
    col.innerText = `${content}`;
    parent.appendChild(col);
    return col;
}

generateTable();