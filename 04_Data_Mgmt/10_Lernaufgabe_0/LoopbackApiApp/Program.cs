using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages().AddRazorPagesOptions(o =>
{
    o.Conventions.ConfigureFilter(new IgnoreAntiforgeryTokenAttribute());
});

// needed for API access through the API client; see UseCors()
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS_CONFIG", cors =>
    {
        cors.WithMethods(builder.Configuration["Cors:Method"])
            .WithHeaders(builder.Configuration["Cors:Header"])
            .WithOrigins(builder.Configuration["Cors:Origin"]);
    });
});


var app = builder.Build();

// add -->
app.MapControllers(); 
app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapRazorPages();
app.UseCors("CORS_CONFIG");
// <--

app.Run();
