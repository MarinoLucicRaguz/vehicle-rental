using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Authorize]
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

        [HttpPost]
        [Route(nameof(GetAvailableVehicleInPeriod))]
        public async Task<IActionResult> GetAvailableVehicleInPeriod(VehicleAvailablePeriodDTO period)
        {
            var result = await _vehicleService.GetAvailableVehiclesInPeriodAsync(period.StartTime, period.EndTime);
            return HandleResponse(result);
        }
    }
}
