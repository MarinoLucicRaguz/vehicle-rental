using VehicleRentalSystem.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace VehicleRentalSystem.WebApi.Controllers
{
    public abstract class BaseApiController : ControllerBase
    {
        protected IActionResult HandleResponse<T>(ServiceResponse<T> response)
        {
            return response.StatusCode switch
            {
                200 => Ok(response),
                201 => Created(string.Empty, response),
                400 => BadRequest(response),
                401 => Unauthorized(response),
                403 => Forbid(),
                404 => NotFound(response),
                422 => UnprocessableEntity(response),
                _ => StatusCode(response.StatusCode, response)
            };
        }

    }
}
