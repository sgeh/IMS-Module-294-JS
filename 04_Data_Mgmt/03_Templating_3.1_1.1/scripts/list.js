const data = [
    { id: 1, name: "Bob", place: "Zürich" },
    { id: 2, name: "Melanie", place: "Zürich" },
    { id: 5, name: "Pascal", place: "Luzern" },
    { id: 3, name: "Lea", place: "Arth" },
    { id: 4, name: "Loris", place: "Bern" },
    { id: 8, name: "Daniel", place: "Rapperswil" },
    { id: 7, name: "Tamara", place: "Jona" }
  ];

function generateList() {
    listContainer.innerHTML = templateCompiled({ list: data });
}

const listTemplate = document.querySelector("#list-template").innerHTML;
const templateCompiled = Handlebars.compile(listTemplate);
const listContainer = document.querySelector("#list-container");

generateList();