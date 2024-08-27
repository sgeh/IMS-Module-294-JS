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
    const list = document.querySelector('#table-content');
    list.innerText = ''; // or use list.replaceChildren([]);

    for (let user of data) {
        const listItem = document.createElement('tr');

        generateCol(listItem, 'th', user.id).setAttribute('scope', 'row');
        generateCol(listItem, 'td', user.name);
        generateCol(listItem, 'td', user.place);

        list.appendChild(listItem);
    }
}

function generateCol(parent, tag, content) {
    const col = document.createElement(tag);
    col.innerText = `${content}`;
    parent.appendChild(col);
    return col;
}

function sortById() {
    data.sort((a, b) => (a.id - b.id));
    generateTable();
}

function sortByName() {
    data.sort((a, b) => a.name.localeCompare(b.name));
    generateTable();
}

function sortByPlace() {
    data.sort((a, b) => a.place.localeCompare(b.place));
    generateTable();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#sortById").addEventListener("click", () => sortById());
    document.querySelector("#sortByName").addEventListener("click", () => sortByName());
    document.querySelector("#sortByPlace").addEventListener("click", () => sortByPlace());

    generateTable();
});
