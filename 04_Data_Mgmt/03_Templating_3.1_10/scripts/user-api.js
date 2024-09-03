async function generateTable() {
    const response = await fetch('http://localhost:4200/api/user');
    const data = await response.json();
    const userData = {
        users: data.map((user) => {
            return {
                id: user.id,
                location: user.location,
                firstName: user.firstName,
                lastName: user.lastName,
                friends: resolveFriends(data, user)
            }
        })
    };

    gridContainer.innerHTML = templateCompiled(userData);
}

/*-- OPTIONAL FEATURE --*/
function resolveFriends(data, user) {
    let friends = '';
    for (let userRef of user.friends) {
        if (friends !== '') {
            friends += ', ';
        }
        const friend = getUserById(data, userRef);
        friends += `${friend.firstName} ${friend.lastName}`;
    }
    return friends;
}

function getUserById(data, id) {
    for (let user of data) {
        if (user.id === id) {
            return user;
        }
    }
    return { };
}

const cardTemplate = document.querySelector("#card-template").innerHTML;
const templateCompiled = Handlebars.compile(cardTemplate);
const gridContainer = document.querySelector("#grid-content");

generateTable(); 