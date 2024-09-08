using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Models;
using NoteApp.Security;

namespace NoteApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize()] // for JWT handling
    public class NotesController : ControllerBase
    {
        private readonly NoteAppContext _context;

        public NotesController(NoteAppContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/notes/5
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function getNote() {
        ///    const request = await fetch('http://localhost:4200/api/notes/1', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJqdGkiOiJiYjMwNTI2YS0wMjg1LTQ2YjYtODcwMS1mNGJlNTE3YTg3ZGIiLCJuYmYiOjE2OTQyODg5NDgsImV4cCI6MTY5NDcyMDk0OCwiaWF0IjoxNjk0Mjg4OTQ4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.KoRJgsfotkMSK_9XrsnlwUisr61z1KbnMjfHCSAVvjJtOoGtsc5JnwVnArRQSWk9SbaQYUZXki7NMRuaVKOW8Q'
        ///        },
        ///      method: 'GET'
        ///    });
        ///    const data = await request.json();
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="id">ID of the note to retrieve.</param>
        /// <returns>Returns the note associated to the given id.</returns>
        [HttpGet("{id}")]
        public ActionResult<ICollection<Note>> Get(long id)
        {
            long? userId = JwtTokenHandler.GetIdClaim(User);
            if (userId == null) { return BadRequest(); }

            var foundNote = _context.Notes.Find(id);

            if (foundNote != null && foundNote.UserId == userId.Value) {
                return Ok(foundNote);
            }
            return NotFound();
        }

        /// <summary>
        /// GET: api/notes
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function getNotes() {
        ///    const request = await fetch('http://localhost:4200/api/notes/', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJqdGkiOiJiYjMwNTI2YS0wMjg1LTQ2YjYtODcwMS1mNGJlNTE3YTg3ZGIiLCJuYmYiOjE2OTQyODg5NDgsImV4cCI6MTY5NDcyMDk0OCwiaWF0IjoxNjk0Mjg4OTQ4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.KoRJgsfotkMSK_9XrsnlwUisr61z1KbnMjfHCSAVvjJtOoGtsc5JnwVnArRQSWk9SbaQYUZXki7NMRuaVKOW8Q'
        ///        },
        ///      method: 'GET'
        ///    });
        ///    const data = await request.json();
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <returns>Returns all notes in the database.</returns>
        [HttpGet]
        public ActionResult<ICollection<Note>> GetAll()
        {
            long? userId = JwtTokenHandler.GetIdClaim(User);
            if (userId == null) { return BadRequest(); }

            return Ok(_context.Notes
                .Where(n => n.UserId == userId)
                .ToList());
        }

        /// <summary>
        /// POST: api/notes
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function addNote() {
        ///    const request = await fetch('http://localhost:4200/api/notes/', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Content-Type': 'application/json',
        ///        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJqdGkiOiJiYjMwNTI2YS0wMjg1LTQ2YjYtODcwMS1mNGJlNTE3YTg3ZGIiLCJuYmYiOjE2OTQyODg5NDgsImV4cCI6MTY5NDcyMDk0OCwiaWF0IjoxNjk0Mjg4OTQ4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.KoRJgsfotkMSK_9XrsnlwUisr61z1KbnMjfHCSAVvjJtOoGtsc5JnwVnArRQSWk9SbaQYUZXki7NMRuaVKOW8Q'
        ///        },
        ///      method: 'POST',
        ///      body: JSON.stringify({ todo: 'new todo', dueDate: '2023-08-19T18:31:35.294Z', completionDate: '2023-08-19T18:31:35.294Z' }),
        ///    });
        ///    const data = await request.json();
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="note">Note data to be stored.</param>
        /// <returns>Returns the created note.</returns>
        [HttpPost]
        public ActionResult<Note> Post(Note note)
        {
            long? userId = JwtTokenHandler.GetIdClaim(User);
            if (userId == null) { return BadRequest(); }

            note.UserId = userId.Value;
            _context.Notes.Add(note);
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(Get),
                new { id = note.Id },
                note);
        }

        /// <summary>
        /// PUT: api/notes/5
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function updateNote() {
        ///    const request = await fetch('http://localhost:4200/api/notes/1', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Content-Type': 'application/json',
        ///        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJqdGkiOiJiYjMwNTI2YS0wMjg1LTQ2YjYtODcwMS1mNGJlNTE3YTg3ZGIiLCJuYmYiOjE2OTQyODg5NDgsImV4cCI6MTY5NDcyMDk0OCwiaWF0IjoxNjk0Mjg4OTQ4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.KoRJgsfotkMSK_9XrsnlwUisr61z1KbnMjfHCSAVvjJtOoGtsc5JnwVnArRQSWk9SbaQYUZXki7NMRuaVKOW8Q'
        ///        },
        ///      method: 'PUT',
        ///      body: JSON.stringify({ id: 1, todo: 'overwrite todo', dueDate: '2023-08-20T18:31:35.294Z', completionDate: '2023-08-20T18:31:35.294Z' }),
        ///    });
        ///    const data = request.status;
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="id">ID of the note to be edited.</param>
        /// <param name="note">Note data to be stored.</param>
        /// <returns>Nothing, see HTTP status code.</returns>
        [HttpPut("{id}")]
        public ActionResult Put([FromRoute] long id, [FromBody] Note note)
        {
            long? userId = JwtTokenHandler.GetIdClaim(User);
            if (userId == null) { return BadRequest(); }

            var noteFromDb = _context.Notes.Find(id);
            if (noteFromDb == null)
            {
                return NotFound();
            }

            noteFromDb.CompletionDate = note.CompletionDate;
            noteFromDb.DueDate = note.DueDate;
            noteFromDb.Name = note.Name;
            noteFromDb.Description = note.Description;
            noteFromDb.UserId = userId.Value;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) // when (!ItemExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        /// <summary>
        /// DELETE: api/notes/5
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function deleteNote() {
        ///    const request = await fetch('http://localhost:4200/api/notes/1', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Content-Type': 'application/json',
        ///        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJqdGkiOiJiYjMwNTI2YS0wMjg1LTQ2YjYtODcwMS1mNGJlNTE3YTg3ZGIiLCJuYmYiOjE2OTQyODg5NDgsImV4cCI6MTY5NDcyMDk0OCwiaWF0IjoxNjk0Mjg4OTQ4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.KoRJgsfotkMSK_9XrsnlwUisr61z1KbnMjfHCSAVvjJtOoGtsc5JnwVnArRQSWk9SbaQYUZXki7NMRuaVKOW8Q'
        ///        },
        ///      method: 'DELETE'
        ///    });
        ///    const data = request.status;
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="id">ID of the note to be deleted.</param>
        /// <returns>Nothing, see HTTP status code.</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            long? userId = JwtTokenHandler.GetIdClaim(User);
            if (userId == null) { return BadRequest(); }

            var noteFromDb = _context.Notes.Find(id);
            if (noteFromDb == null || noteFromDb.UserId != userId)
            {
                return NotFound();
            }

            _context.Remove(noteFromDb);
            _context.SaveChanges();
            return NoContent();
        }
    }
}