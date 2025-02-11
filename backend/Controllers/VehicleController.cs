using backend.Models.Entities;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/vehicles")]
    [Authorize]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetAllVehicles()
        {
            return Ok(await _vehicleService.GetAllVehicles());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicleById(int id)
        {
            var vehicle = await _vehicleService.GetVehicleById(id);
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<ActionResult<Vehicle>> AddVehicle([FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdVehicle = await _vehicleService.AddVehicle(vehicle);
            return CreatedAtAction(nameof(GetVehicleById), new { id = createdVehicle.Id }, createdVehicle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] Vehicle vehicle)
        {
            if (id != vehicle.Id)
                return BadRequest();

            await _vehicleService.UpdateVehicle(vehicle);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var deleted = await _vehicleService.DeleteVehicle(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
