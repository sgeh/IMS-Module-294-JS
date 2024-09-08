let notes = [ ];

function renderDetailView(id) {
    let note = notes.find(n => n.id === id);
    
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

    document.querySelector("#details-view").innerHTML = `
        <header>
            <h2>${note.name}</h2>
        </header>
        <section>
            <p>${note.description}</p>
            <p>${dueDate}</p>
            <p class="completed">${completed}</p>
        </section>`;
}

async function renderNavigation() {
    const leftNav = document.querySelector("#left-nav");

    try {
        const token = localStorage.getItem('jwt-token');
        notes = await getNotes(token);
        let leftNavHtml = '';

        for (let note of notes) {
            leftNavHtml += `<li><a href="#" onclick="renderDetailView(${note.id})">${note.name}</a></li>`;
        }
        leftNav.innerHTML = leftNavHtml;
        
        // optional: default note selection (if a note present)
        if (notes.length > 0) {
            renderDetailView(notes[0].id);
        }
    }
    catch (err) {
        console.warn(err);
    }
}

renderNavigation();            
