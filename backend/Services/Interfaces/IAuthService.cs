using backend.Models.DTOs.Auth;
using System.Security.Claims;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDTO model);
        Task<string?> LoginAsync(LoginDTO model);
        Task<ClaimsPrincipal> ValidateTokenAsync(string token);
    }
}
