using Microsoft.EntityFrameworkCore;
using WebApplication2.Context;
using WebApplication2.Services;

namespace WebApplication2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddSingleton<IServiceUsers, ServiceUsers>();
            builder.Services.AddDbContext<UserContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });  
            builder.Services.AddControllers();
            var app = builder.Build();
            app.UseStaticFiles();
            app.UseRouting();
            app.MapControllers();
            

            app.Run();
        }
    }
}
