async function generateTable() {
    const response = await fetch('http://localhost:4200/api/user');
    const data = await response.json();

    const grid = document.querySelector('#grid-content');
    grid.innerText = ''; // clear grid

    for (let user of data) { // solution for exercise 2.1
        const userCard = document.createElement('section');
        userCard.innerHTML = `
        <header>
            <h3>${user.firstName} ${user.lastName}</h3>
            <span>#${user.id}</span>
        </header>
        <div>
            <p><h4>Location: ${user.location}</h4></p>
            <p>Birthday: ${user.birthday}</p>
            <p>Friends: ${resolveFriends(data, user)}</p> <!-- SHOULD Requirement -->
        </div>`;
        grid.appendChild(userCard); // CAUTION: slow performance
    }
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

generateTable(); 