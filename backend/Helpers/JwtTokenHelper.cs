using backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Helpers
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
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
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
    }
}
