using backend.Models.DTOs.Auth;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDTO model);
        Task<string?> LoginAsync(LoginDTO model);
    }
}
