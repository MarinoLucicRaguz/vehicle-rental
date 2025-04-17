using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleRentalSystem.Application.DTOs.Location;
using VehicleRentalSystem.Application.Interfaces;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LocationController : BaseApiController
    {
        private readonly ILocationService _locationService;
        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocationDTO locationDto)
        {
            var response = await _locationService.CreateLocationAsync(locationDto);
            return StatusCode((int)response.StatusCode, response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var response = await _locationService.GetAllLocationsAsync();
            return HandleResponse(response);
        }
    }
}
