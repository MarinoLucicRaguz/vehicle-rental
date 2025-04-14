using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : BaseApiController
    {
        private readonly IVehicleService _vehicleService;
        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateVehicleDTO vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _vehicleService.CreateVehicleAsync(vehicle);
            return HandleResponse(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var result = await _vehicleService.GetAllVehiclesAsync();
            return HandleResponse(result);
        }
    }
}
