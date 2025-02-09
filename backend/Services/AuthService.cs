using backend.Helpers;
using backend.Models.DTOs.Auth;
using backend.Models.Entities;
using backend.Repositories;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly JwtTokenHelper _jwtTokenHelper;
        public AuthService(UserManager<User> userManager, IUserRepository userRepository, JwtTokenHelper jwtTokenHelper)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _jwtTokenHelper = jwtTokenHelper;
        }

        public async Task<string?> RegisterAsync(RegisterDTO model)
        {
            if (await _userRepository.GetUserByUsernameAsync(model.UserName) != null)
                return "Username is already in use.";

            var user = new User
            {
                UserName = model.UserName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return string.Join(", ", result.Errors.Select(e => e.Description));

            await _userManager.AddToRoleAsync(user, "User");

            return null;
        }

        public async Task<string?> LoginAsync(LoginDTO model)
        {
            var user = await _userRepository.GetUserByUsernameAsync(model.UserName);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, model.Password)))
                return null;

            return await _jwtTokenHelper.GenerateJwtToken(user);
        }
    }
}
