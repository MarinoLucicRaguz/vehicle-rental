using backend.Models.DTOs.Auth;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDTO model);
        Task<string?> LoginAsync(LoginDTO model);
    }
}
