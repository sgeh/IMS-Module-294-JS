using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NoteApp.Data;
using NoteApp.Models;
using System.Text;

#region Register DI dependencies

var builder = WebApplication.CreateBuilder(args);

// Needed for API access through the JS client; see UseCors()
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS_CONFIG", cors =>
    {
        cors.WithMethods(builder.Configuration["Cors:Method"])
            .WithHeaders(builder.Configuration["Cors:Header"])
            .WithOrigins(builder.Configuration["Cors:Origin"]);
    });
});

// Needed for API description
builder.Services.AddRazorPages().AddRazorPagesOptions(o =>
{
    o.Conventions.ConfigureFilter(new IgnoreAntiforgeryTokenAttribute());
});

/*
 * Add Database Context to DI container:
 */
builder.Services
    .AddDbContext<NoteAppContext>(opt => opt.UseSqlServer(DbInitializer.GetConnectionString(builder.Environment, builder.Configuration)))
    .AddDatabaseDeveloperPageExceptionFilter(); // provides helpful error information in the development environment.

// Register db initializer
builder.Services.AddTransient<DbInitializer>();

// Add for JWT mappings
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true
        };
    });


#endregion


#region Application Startup

var app = builder.Build();

// Add for controller mappings
app.MapControllers(); 

// Add for cshtml page mappings
app.MapRazorPages();

// Add for JWT authorization (middleware)
app.UseAuthentication();
app.UseAuthorization();

app.UseCors("CORS_CONFIG");

// Execute db initializer
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<DbInitializer>().Run();
}

// startup server
app.Run();

#endregion