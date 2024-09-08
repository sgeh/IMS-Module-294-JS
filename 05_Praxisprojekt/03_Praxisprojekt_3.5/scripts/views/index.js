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

function switchEditView(id) {
    window.localStorage.setItem('note-id', id);
    window.location = './pages/edit.html';
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
                <input type="button" onclick="switchEditView(note.id)" value="Bearbeiten">&nbsp;
                <input type="button" onclick="deleteSelectedNote()" value="Löschen">
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
        leftNavHtml += `<li><a href="#" onclick="renderDetailView(${note.id})">${note.name}</a></li>`;
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
renderIndex();            
