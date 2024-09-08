using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Controllers
{
    public class LoginInfo
    {
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
