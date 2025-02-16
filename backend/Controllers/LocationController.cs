using backend.Models.Entities;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/locations")]
    //[Authorize]
    public class LocationController : Controller
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetAllLocations()
        {
            return Ok(await _locationService.GetAllLocations());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocationById(int id)
        {
            var location = await _locationService.GetLocationById(id);
            if (location == null)
                return NotFound();
            return Ok(location);
        }


        [HttpGet("{name}")]
        public async Task<ActionResult<Location>> GetLocationByName(string name)
        {
            var location = await _locationService.GetLocationByName(name);
            if (location == null)
                return NotFound();
            return Ok(location);
        }

        [HttpPost]
        public async Task<ActionResult<Location>> AddLocation([FromBody] Location vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdLocation = await _locationService.AddLocation(vehicle);
            return CreatedAtAction(nameof(GetLocationById), new { id = createdLocation.Id }, createdLocation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLocation(int id, [FromBody] Location vehicle)
        {
            if (id != vehicle.Id)
                return BadRequest();

            await _locationService.UpdateLocation(vehicle);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var deleted = await _locationService.DeleteLocation(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
