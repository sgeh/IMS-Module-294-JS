import { getNotes, updateNote, deleteNote } from '../notes-api.js';

let notes = [ ];
let note = undefined; // selected note

async function deleteSelectedNote() {
    const token = localStorage.getItem('jwt-token');
    await deleteNote(token, note.id);

    // remove note from notes array and reset selected note
    notes = notes.filter(n => n.id !== note.id);
    note = undefined;

    // refresh UI
    renderNavigation();
    renderDetailView(); 
}

async function saveEditView() {
    const name = document.querySelector('#edit-name').value;
    const description = document.querySelector('#edit-description').value;
    const dueDate = document.querySelector('#edit-dueDate').valueAsDate;

    try {
        const token = localStorage.getItem('jwt-token');
        note.name = name;
        note.description = description;
        note.dueDate = (dueDate !== null) ? dueDate.toISOString() : null;

        await updateNote(token, note);

        // refresh UI
        renderNavigation();
        renderDetailView(note.id); 
    }
    catch (err) {
        console.warn(err);
    }
}

function switchEditView() {
    let dueDate = '';
    if (note.dueDate !== null) {
        const dueDateObj = new Date(note.dueDate);
        const day = `${dueDateObj.getDate()}`;
        const month = `${dueDateObj.getMonth() + 1}`;
        const year = `${dueDateObj.getFullYear()}`;
        dueDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    document.querySelector('#details-view').className = 'inactive-view';
    document.querySelector('#edit-view').className = 'view';
    document.querySelector('#edit-view').innerHTML = `
        <form>
            <header>
                <label>
                    <span>Name: </span>
                    <input type="text" id="edit-name" value="${note.name}" required>
                </label>
            </header>
            <section>
                <label>
                    <span>Description: </span>
                    <input type="text" id="edit-description" value="${note.description}">
                </label>
                <label>
                    <span>Due Date: </span>
                    <input type="date" id="edit-dueDate" value="${dueDate}">
                </label>
                <input type="button" data-action="save" value="Speichern">
            </section>
        </form>`;
}

function renderDetailView(id) {
    note = notes.find(n => n.id === id);
    
    if (note === undefined) { // fallback to first note
        note = notes[0]; // may also result in undefined
    }

    let detailViewHtml = 'Keine Notiz selektiert';

    if (note !== undefined) {
        let dueDate = '';
        if (note.dueDate !== null) {
            const dueDateObj = new Date(note.dueDate);
            const day = dueDateObj.getDate();
            const month = dueDateObj.getMonth() + 1;
            const year = dueDateObj.getFullYear();
            dueDate = `Zu erledigen bis: ${day}.${month}.${year}`;
        }

        let completed = '';
        if (note.completionDate === null) {
            completed = 'Noch nicht erledigt';
        }

        detailViewHtml = `
            <header>
                <h2>${note.name}</h2>
            </header>
            <section>
                <p>${note.description}</p>
                <p>${dueDate}</p>
                <p class="completed">${completed}</p>
                <input type="button" data-action="edit" value="Bearbeiten">&nbsp;
                <input type="button" data-action="delete" value="Löschen">
            </section>`
    }

    document.querySelector('#edit-view').className = 'inactive-view';
    document.querySelector('#details-view').className = 'view';
    document.querySelector('#details-view').innerHTML = detailViewHtml;
}

function renderNavigation() {
    const leftNav = document.querySelector('#left-nav');
    let leftNavHtml = '';

    for (let note of notes) {
        leftNavHtml += `<li><a href="#" data-action="select" data-id="${note.id}">${note.name}</a></li>`;
    }
    leftNav.innerHTML = leftNavHtml;
}

async function renderIndex() {
    try {
        // load data async
        const token = localStorage.getItem('jwt-token');
        notes = await getNotes(token);
        
        renderNavigation();
        renderDetailView(); // default note selection (if a note present)
    }
    catch (err) {
        console.warn(err);
    }
}

// link to 'create note' feature
document.querySelector('#create-button').addEventListener('click',  () => {
    window.location.href = './pages/create.html';
});

// functions aren't globally accessible anymore; actions must be qualified during
// the click event (data attributes) and resolved by JavaScript (dataSet property).
document.querySelector('.main-content').addEventListener('click',  (e) => {
    switch (e.target.dataset.action) {
        case 'save':
            saveEditView();
            break;
        case 'edit':
            switchEditView();
            break;
        case 'delete':
            deleteSelectedNote();
            break;
        case 'select':
            renderDetailView(Number(e.target.dataset.id));
            break;
    }
});

renderIndex();            

