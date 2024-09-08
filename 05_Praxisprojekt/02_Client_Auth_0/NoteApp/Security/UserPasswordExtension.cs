using Microsoft.AspNetCore.Identity;
using NoteApp.Models;

namespace NoteApp.Security
{
    public static class UserPasswordExtension
    {
        private static readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        public static void SetHashedPassword(this User user, string password)
        {
            user.Password = _passwordHasher.HashPassword(user, password);
        }

        public static bool VerifyPassword(this User user, string? password)
        {
            return !string.IsNullOrEmpty(password)
                    && _passwordHasher.VerifyHashedPassword(user, user.Password, password) == PasswordVerificationResult.Success;
        }
    }
}
