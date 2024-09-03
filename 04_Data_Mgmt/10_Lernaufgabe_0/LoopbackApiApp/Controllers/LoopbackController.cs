using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LoopbackApiApp.Controllers
{
    /// <summary>
    /// For documentation see <see cref="https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-7.0"/>
    /// </summary>
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoopbackController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IDictionary<string, object>> Get()
        {
            return Ok(ConvertMultiFormData(Request.Query));
        }

        [HttpPost]
        public async Task<ActionResult<IDictionary<string, object>>> PostAsync()
        {
            using var reader = new StreamReader(HttpContext.Request.Body);
            var body = await reader.ReadToEndAsync();
            var requestData = (JsonConvert.DeserializeObject(body) as JObject);
            var result = new Dictionary<string, object>();

            foreach (var data in requestData)
            {
                if (data.Value is JValue)
                {
                    result.Add(data.Key, ((JValue)data.Value).Value);
                }
            }
            return Ok(result);
        }

        private IDictionary<string, object> ConvertMultiFormData(IEnumerable<KeyValuePair<string, StringValues>> collection)
        {
            return new Dictionary<string, object>(
                from queryParam in collection
                select new KeyValuePair<string, object>(
                    queryParam.Key, (queryParam.Value.Count > 1) ? queryParam.Value : queryParam.Value.ToString()));
        }
    }
}