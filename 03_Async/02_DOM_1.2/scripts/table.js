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

        const th = document.createElement('th');
        th.setAttribute("scope", "row");
        th.innerText = `${user.id}`;
        row.appendChild(th);

        const td1 = document.createElement('td');
        td1.innerText = `${user.name}`;
        row.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = `${user.place}`;
        row.appendChild(td2);

        table.appendChild(row);
    }
}

generateTable();