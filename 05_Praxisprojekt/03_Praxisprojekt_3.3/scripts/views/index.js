async function renderNavigation() {
    const leftNav = document.querySelector("#left-nav");

    try {
        const token = localStorage.getItem('jwt-token');
        const notes = await getNotes(token);
        let leftNavHtml = '';

        for (let note of notes) {
            leftNavHtml += `<li><a href="#">${note.name}</a></li>`;
        }
        leftNav.innerHTML = leftNavHtml;
    }
    catch (err) {
        console.warn(err);
    }
}

renderNavigation();            
