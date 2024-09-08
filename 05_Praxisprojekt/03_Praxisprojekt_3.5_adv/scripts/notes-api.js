const environment = { apiRoot: 'http://localhost:4200' };

/**
 * Declares the JSON type with all properties for a single note object.
 * @typedef Note
 * @type {object}
 * @property {string} id - ID of the Note.
 * @property {string} name - A short title of the note.
 * @property {string} description - A description text.
 * @property {string} dueDate - Due date as string (see new Date().toISOString())
 * @property {string} completionDate - Completion date as string (see new Date().toISOString())
 */

/**
 * Gets all notes from the database.
 * @param {string} token JWT token with authentication info.
 * @returns {Promise<Note>} Returns all notes in the database.
 */
async function getNotes(token) {
    const request = await fetch(`${environment.apiRoot}/api/notes/`, {
        headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await request.json();
    return data;
}

/**
 * Gets the note with the given id.
 * @param {string} token JWT token with authentication info.
 * @param {number} id ID of the note to retrieve.
 * @returns {Promise<Note>} Returns the note associated to the given id.
 */
async function getNote(token, id) {
    const request = await fetch(`${environment.apiRoot}/api/notes/${id}`, {
        headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    });
    const data = await request.json();
    return data;
}

/**
 * Stores a new note into the database.
 * @param {string} token JWT token with authentication info.
 * @param {Note} note The note object to be sent to the server.
 * @returns {Promise<Note>} Returns the created note.
 */
async function addNote(token, note) {
    const request = await fetch(`${environment.apiRoot}/api/notes/`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(note),
    });
    const data = await request.json();
    return data;
}

/**
 * Updates an existing note in the database.
 * @param {string} token JWT token with authentication info.
 * @param {Note} note The note object to be updated on the server.
 * @returns {Promise<Note>} Returns the HTTP status code.
 */
async function updateNote(token, note) {
    const request = await fetch(`${environment.apiRoot}/api/notes/${note.id}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify(note),
    });
    const data = request.status;
    return data;
}

/**
 * Removes an existing note from the database.
 * @param {string} token JWT token with authentication info.
 * @param {number} id ID of the note to be deleted.
 * @returns {Promise<Note>} Returns the HTTP status code.
 */
async function deleteNote(token, id) {
    const request = await fetch(`${environment.apiRoot}/api/notes/${id}`, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    });
    const data = request.status;
    return data;
}
