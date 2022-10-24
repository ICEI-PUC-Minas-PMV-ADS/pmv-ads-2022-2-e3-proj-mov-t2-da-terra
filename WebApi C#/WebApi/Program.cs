using  WebApiDaTerra.data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DaTerraDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapControllerRoute(

    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);



/*app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();*/

app.Run();