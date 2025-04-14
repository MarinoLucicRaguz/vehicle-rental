using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Auth;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResponse<string?>> RegisterAsync(RegisterDTO model);
        Task<ServiceResponse<string?>> LoginAsync(LoginDTO model);
        Task<ServiceResponse<TokenClaimDTO?>> ValidateTokenAsync(string token);
    }
}
