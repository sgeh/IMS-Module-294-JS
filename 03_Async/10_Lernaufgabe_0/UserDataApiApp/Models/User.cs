using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace LoopbackApiApp.Controllers
{
    public class User
    {
        public int Id { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Location { get; set; }
        public string? Birthday { get; set; }
        public List<int>? Friends { get; set; }
    }
}