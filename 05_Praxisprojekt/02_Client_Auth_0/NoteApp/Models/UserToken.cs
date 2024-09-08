using System.ComponentModel.DataAnnotations.Schema;

namespace NoteApp.Models
{
    public class UserToken
    {
        public string? Email { get; set; }
        
        public string? JWT { get; set; }
        
        public DateTime ExpiresAt { get; set; }
    }
}
