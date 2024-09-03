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
    tableContainer.innerHTML = templateCompiled({ list: data });
}

const rowTemplate = document.querySelector("#row-template").innerHTML;
const templateCompiled = Handlebars.compile(rowTemplate);
const tableContainer = document.querySelector("#table-content");

generateTable();