using VehicleRentalSystem.Application.DTOs.Auth;
using VehicleRentalSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace VehicleRentalSystem.Application.Helpers
{
    public class JwtTokenHelper
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public JwtTokenHelper(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }
        public async Task<string> GenerateJwtToken(User user)
        {
            string? secretKey = _configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
                throw new ArgumentNullException(nameof(secretKey), "Secret key is not configured.");

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var roles = await _userManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>
            {
                new Claim(nameof(User.Id), user.Id.ToString()),
                new Claim(nameof(User.UserName), user.UserName ?? ""),
            };

            claims.AddRange(roles.Select(role => new Claim(nameof(User.Role), role)));

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public TokenClaimDTO? ValidateJwtToken(string token)
        {
            string? secretKey = _configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
                throw new ArgumentNullException(nameof(secretKey), "Secret key is not configured.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secretKey);

            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["JwtSettings:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["JwtSettings:Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                string userId = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? "";
                string userName = principal.FindFirst(ClaimTypes.Name)?.Value ?? "";
                //var roles = principal.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();

                return new TokenClaimDTO { Id = userId, Username = userName,/* Role = roles*/ };
            }
            catch
            {
                return null;
            }
        }

    }
}
