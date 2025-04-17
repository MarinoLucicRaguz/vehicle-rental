using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Auth;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace VehicleRentalSystem.Application.Services
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

        public async Task<ServiceResponse<string?>> LoginAsync(LoginDTO model)
        {
            User? user = await _userRepository.GetUserByUsernameAsync(model.Username);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, model.Password)))
                return ApiResponse.Unauthorized<string?>("Pogrešno korisničko ime ili zaporka.");

            string jwtToken = await _jwtTokenHelper.GenerateJwtToken(user);
            return ApiResponse.Success<string?>(jwtToken, "Uspješno prijavljivanje.");
        }

        public async Task<ServiceResponse<string?>> RegisterAsync(RegisterDTO model)
        {
            if (await _userRepository.GetUserByUsernameAsync(model.Username) != null)
                return ApiResponse.Failure<string?>("Korisničko ime već postoji.");

            if (!model.Password.Equals(model.ConfirmPassword))
                return ApiResponse.Failure<string?>("Zaporke se ne podudaraju.");

            var user = new User { UserName = model.Username };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return ApiResponse.Failure<string?>("Greška prilikom registracije.");

            //await _userManager.AddToRoleAsync(user, "User");

            return ApiResponse.Created<string?>("Uspješno registriran korisnik.");
        }

        public Task<ServiceResponse<TokenClaimDTO?>> ValidateTokenAsync(string token)
        {
            var principal = _jwtTokenHelper.ValidateJwtToken(token);

            if (principal == null)
                return Task.FromResult(ApiResponse.Unauthorized<TokenClaimDTO?>("Token je istekao."));

            return Task.FromResult(ApiResponse.Success<TokenClaimDTO?>(principal, "Token je validan."));
        }
    }
}
