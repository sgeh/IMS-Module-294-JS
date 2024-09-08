const noteId = window.localStorage.getItem('note-id');

async function createEditView() {
    const token = localStorage.getItem('jwt-token');
    
    try {
        const note = await getNote(token, noteId);

        document.querySelector('#edit-name').value = note.name;
        document.querySelector('#edit-description').value = note.description;
    
        if (note.dueDate !== null) {
            const dueDateObj = new Date(note.dueDate);
            const day = `${dueDateObj.getDate()}`;
            const month = `${dueDateObj.getMonth() + 1}`;
            const year = `${dueDateObj.getFullYear()}`;
            document.querySelector('#edit-dueDate').value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
    }
    catch (err) {
        window.location.href = '../index.html';
    }
}

async function saveEditView() {
    const name = document.querySelector('#edit-name').value;
    const description = document.querySelector('#edit-description').value;
    const dueDate = document.querySelector('#edit-dueDate').valueAsDate;

    try {
        const token = localStorage.getItem('jwt-token');
        const note = {
            id: noteId,
            name: name,
            description: description,
            dueDate: (dueDate !== null) ? dueDate.toISOString() : null
        };

        await updateNote(token, note);
        window.localStorage.removeItem('note-id')
        window.location.href = '../index.html';
    }
    catch (err) {
        console.warn(err);
    }
}

document.querySelector('form').addEventListener('submit',  (e) => {
    e.preventDefault();
    saveEditView();
});

createEditView();