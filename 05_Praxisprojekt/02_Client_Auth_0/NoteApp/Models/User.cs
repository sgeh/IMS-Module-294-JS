using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Models
{
    public class User
    {
        public long Id { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public ICollection<Note>? Notes { get; set; }
    }
}
