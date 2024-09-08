using Microsoft.AspNetCore.Mvc;
using NoteApp.Models;
using NoteApp.Security;

namespace NoteApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly NoteAppContext _context;
        private readonly IConfiguration _config;

        public UsersController(IConfiguration config, NoteAppContext context)
        {
            _config = config;
            _context = context;
        }

        /// <summary>
        /// Registers a new user in the system.
        ///  <code>POST: api/users/register {email, password}</code>
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function register() {
        ///    const response = await fetch('http://localhost:4200/api/users/register', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Content-Type': 'application/json'
        ///      },
        ///      cache: 'no-cache',
        ///      method: 'POST',
        ///      body: JSON.stringify({ 'email': 'new-user@example.com', 'password': 'user1234' })
        ///    });
        ///    const data = await response.json();
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="login">
        ///  <code>
        ///   {
        ///    email: string /* E-Mail address as user name of the new user to create. */,
        ///    password: string /* Password of the new user to create. */
        ///   }
        ///  </code>
        /// </param>
        /// <returns>Returns the token information containing the JWT token.</returns>
        [HttpPost("register")]
        public ActionResult<UserToken> Register(LoginInfo login)
        {
            var user = (from usr in _context.Users
                        where usr.Email == login.Email
                        select usr).FirstOrDefault();

            if (user == null 
                && !string.IsNullOrEmpty(login.Email) 
                && !string.IsNullOrEmpty(login.Password))
            {
                User newUser = new User { Email = login.Email };
                newUser.SetHashedPassword(login.Password);
                
                _context.Add(newUser);
                _context.SaveChanges();

                return Ok(JwtTokenHandler.CreateToken(_config, newUser));
            }
            return BadRequest();
        }

        /// <summary>
        /// Authenticates an exiting by using the given email and password.
        ///  <code>POST: api/users/login {email, password}</code>
        /// </summary>
        /// <example>
        ///  <code>
        ///  async function login() {
        ///    const response = await fetch('http://localhost:4200/api/users/login', {
        ///      headers: {
        ///        'Accept': 'application/json',
        ///        'Content-Type': 'application/json'
        ///      },
        ///      cache: 'no-cache',
        ///      method: 'POST',
        ///      body: JSON.stringify({ 'email': 'admin@example.com', 'password': 'user1234' })
        ///    });
        ///    const data = await response.json();
        ///    console.log(data);
        ///  }
        ///  </code>
        /// </example>
        /// <param name="login">
        ///  <code>
        ///   {
        ///    email: string /* E-Mail address as user name of the new user to login. */,
        ///    password: string /*Password of the new user to login. */
        ///   }
        ///  </code>
        /// </param>
        /// <returns>Returns the token information containing the JWT token.</returns>
        [HttpPost("login")]
        public ActionResult<UserToken> Login(LoginInfo login)
        {
            var user = (from u in _context.Users
                        where u.Email == login.Email && u.Password != null
                        select u).FirstOrDefault();
            
            if (user != null && user.VerifyPassword(login.Password))
            {
                return Ok(JwtTokenHandler.CreateToken(_config, user));
            }
            return Unauthorized();
        }
    }
}