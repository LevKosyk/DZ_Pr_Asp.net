namespace WebApplication1
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            List<User> users = new List<User>
            {
                new User {Id = 1, Name = "Test"},
                new User {Id = 2, Name = "Tes1"},
                new User {Id = 3, Name = "Tes2"},
                new User {Id = 4, Name = "Tes3"},
                new User {Id = 5, Name = "Tes4"},
            };

            app.Run(async (context) =>
            {
                var Request = context.Request;
                var Response = context.Response;
                string path= Request.Path;
                
                Response.Headers.Append("Content-type", "text/html; charset=utf-8");
                if (path == "/")
                {
                    Response.StatusCode = 200;
                    await Response.SendFileAsync("wwwroot/index");

                }
                else if (path == "/users") {
                    if(Request.Query.ContainsKey("id") && Request.Query.ContainsKey("name"))
                    {
                        users.Add(new User { Id = int.Parse(Request.Query["id"]), Name = Request.Query["name"] });
                    }
                    Response.StatusCode = 200;
                    await Response.WriteAsJsonAsync(users);
                }
                else
                {
                    Response.StatusCode = 404;
                    await Response.WriteAsync($"PAge 404");
                }
                
            });
            app.Run();
        }
    }
}
