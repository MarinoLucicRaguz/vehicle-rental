using VehicleRentalSystem.Infrastructure;
using VehicleRentalSystem.Application;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var issuer = jwtSettings["Issuer"];
var audience = jwtSettings["Audience"];
var secretKey = jwtSettings["SecretKey"];

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
    };
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

const string AllowFe = "allow-fe";
builder.Services.AddCors(o => o.AddPolicy(AllowFe, p =>
    p.WithOrigins("http://localhost:9300")
     .AllowAnyHeader()
     .AllowAnyMethod()
    .AllowCredentials()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    var httpClientHandler = new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
    };
    var httpClient = new HttpClient(httpClientHandler);
}
app.UseCors(AllowFe);                  // <-- before auth
//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
