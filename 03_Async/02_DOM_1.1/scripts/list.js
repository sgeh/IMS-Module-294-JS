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
    const list = document.querySelector("ul");

    for (let user of data) {
        const listItem = document.createElement("li");
        listItem.innerText = `${user.id}: ${user.name}, ${user.place}`;
        list.appendChild(listItem);
    }
}

generateList();