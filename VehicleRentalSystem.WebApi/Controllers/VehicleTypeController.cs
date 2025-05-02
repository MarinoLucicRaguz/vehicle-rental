using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleRentalSystem.Application.Interfaces;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class VehicleTypeController : BaseApiController
    {
        private readonly IVehicleTypeService _vehicleTypeService;

        public VehicleTypeController(IVehicleTypeService vehicleTypeService)
        {
            _vehicleTypeService = vehicleTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicleTypes()
        {
            var result = await _vehicleTypeService.GetAllVehicleTypesAsync();
            return HandleResponse(result);
        }
    }
}
