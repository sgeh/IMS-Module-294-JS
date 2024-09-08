using Microsoft.AspNetCore.Identity;
using NoteApp.Models;

namespace NoteApp.Data
{
    public class DbInitializer
    {
        private readonly NoteAppContext _context;

        public DbInitializer(NoteAppContext context)
        {
            _context = context;
        }

        public static string GetConnectionString(IWebHostEnvironment env, ConfigurationManager config)
        {
            return config.GetConnectionString("NoteDbConnection").Replace("%CONTENT_ROOT_PATH%", env.ContentRootPath);
        }

        public void Run()
        {
            if (_context.Database.EnsureCreated())
            {
                Seed();
            }
        }

        private void Seed()
        {
            var pwHasher = new PasswordHasher<User>();

            var admin = new User { Email= "admin@example.com" };
            admin.Password = pwHasher.HashPassword(admin, "user1234");

            _context.Users.Add(admin);
            _context.SaveChanges();
            var currentDate = DateTime.Now;
            _context.Notes.AddRange(
                new Note { Name = "Einkaufen", Description = "Brot, Energy Drink, Süsszeug, Salat", User = admin, CompletionDate = currentDate, DueDate = currentDate.AddDays(2) },
                new Note { Name = "Pflanzen tränken", Description = "Alle 7 Tage Pflanzen im Haus giessen.", User = admin, DueDate = currentDate.AddDays(2) },
                new Note { Name = "Hausaufgaben", Description = "Lernaufgabe M294, Physik, Mathe", User = admin, DueDate = currentDate.AddDays(3) } );
            _context.SaveChanges();
        }
    }
}
