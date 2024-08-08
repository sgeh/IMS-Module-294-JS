using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages().AddRazorPagesOptions(o =>
{
    o.Conventions.ConfigureFilter(new IgnoreAntiforgeryTokenAttribute());
});

var app = builder.Build();

// use razor pages -->
app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapRazorPages();
// <--

app.Run();
