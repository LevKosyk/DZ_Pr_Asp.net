using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using WebApplication2.Context;
using WebApplication2.Models;
using WebApplication2.Services;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IServiceUsers? _serviceUsers;
        public HomeController(IServiceUsers serviceUsers, UserContext context) {

            _serviceUsers = serviceUsers;
            _serviceUsers.Context = context;
        }
        [HttpGet]
        public JsonResult Get() => Json(_serviceUsers.Read());
        [HttpGet("{id}")]
        public JsonResult GetUserById(int id) =>Json(_serviceUsers.GetUserById(id));
        [HttpPost]
        public JsonResult PostUser(User user) => Json(_serviceUsers.Create(user));
        [HttpPut]
        public JsonResult PutUser([FromBody] User user)
        {
            var updatedUser = _serviceUsers.Update(user);
            return Json(updatedUser);
        }
        [HttpDelete("{id}")]
        public bool DeleteUser(int id) => _serviceUsers.Delete(id);
    }
}
