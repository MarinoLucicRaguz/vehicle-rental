using VehicleRentalSystem.Application.DTOs.Auth;
using VehicleRentalSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model);
            return HandleResponse(result);
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(model);
            return HandleResponse(result);
        }

        [HttpPost(nameof(ValidateToken))]
        public async Task<IActionResult> ValidateToken([FromBody] TokenValidationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var result = await _authService.ValidateTokenAsync(request.Token);
            return HandleResponse(result);
        }
    }
}
