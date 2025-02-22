using backend.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public abstract class BaseApiController : ControllerBase
    {
        protected IActionResult ApiOk<T>(T data, string? message = null)
        {
            return Ok(ApiResponse.Success(data, message));
        }

        protected IActionResult ApiBadRequest<T>(string message)
        {
            return BadRequest(ApiResponse.Failure<T>(message));
        }

        protected IActionResult ApiUnauthorized<T>(string message)
        {
            return Unauthorized(ApiResponse.Failure<T>(message));
        }
    }
}
