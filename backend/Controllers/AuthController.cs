using backend.Models.DTOs.Auth;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            var result = await _authService.RegisterAsync(model);
            if (result != null)
                return ApiBadRequest<object>(result);

            return ApiOk<object>(null, "User registered successfully.");
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var token = await _authService.LoginAsync(model);
            if (token == null)
                return ApiUnauthorized<object>("Invalid credentials.");

            return ApiOk(new { Token = token }, "Login successful.");
        }

        [HttpPost(nameof(ValidateToken))]
        public async Task<IActionResult> ValidateToken([FromBody] string token)
        {
            try
            {
                ClaimsPrincipal principal = await _authService.ValidateTokenAsync(token);
                var claims = principal.Claims.Select(c => new { c.Type, c.Value });
                return ApiOk(new { Valid = true, Claims = claims });
            }
            catch (UnauthorizedAccessException ex)
            {
                return ApiUnauthorized<object>(ex.Message);
            }
        }
    }
}
