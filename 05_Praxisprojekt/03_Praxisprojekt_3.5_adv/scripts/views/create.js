async function createEditView() {
    const name = document.querySelector('#edit-name').value;
    const description = document.querySelector('#edit-description').value;
    const dueDate = document.querySelector('#edit-dueDate').valueAsDate;

    try {
        const token = localStorage.getItem('jwt-token');
        const note = {
            name: name,
            description: description,
            dueDate: (dueDate !== null) ? dueDate.toISOString() : null
        };

        await addNote(token, note);
        window.location.href = '../index.html';
    }
    catch (err) {
        console.warn(err);
    }
}

document.querySelector('form').addEventListener('submit',  (e) => {
    e.preventDefault();
    createEditView();
});