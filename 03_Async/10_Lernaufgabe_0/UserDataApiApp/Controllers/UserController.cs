using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace LoopbackApiApp.Controllers
{
    /// <summary>
    /// For documentation see <see cref="https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-7.0"/>
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ICollection<User>> Get()
        {
            return Ok(new List<User>
            {
                new User { Id = 1, LastName = "Roth", FirstName = "David", Location = "Basel", Birthday = "10-03-1998", Friends = new List<int> { 2, 4 } },
                new User { Id = 2, LastName = "Marti", FirstName = "Marianne", Location = "Zürich", Birthday = "10-03-2010", Friends = new List<int> { 4, 5 } },
                new User { Id = 3, LastName = "Wirth", FirstName = "Loris", Location = "Genf", Birthday = "10-03-1994", Friends = new List<int> { 1, 4, 5 } },
                new User { Id = 4, LastName = "Lüönd", FirstName = "Pascale", Location = "Rapperswil", Birthday = "01-09-1988", Friends = new List<int> { 2, 3 } },
                new User { Id = 5, LastName = "Morris", FirstName = "Daniel", Location = "St. Gallen", Birthday = "23-05-1948", Friends = new List<int> { 1, 3 } }
            });
        }
    }
}