using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleRentalSystem.Application.DTOs.RentalTypes;
using VehicleRentalSystem.Application.Interfaces;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RentalTypeController : BaseApiController
    {
        private readonly IRentalTypeService _rentalTypeService;
        public RentalTypeController(IRentalTypeService rentalTypeService)
        {
            _rentalTypeService = rentalTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRentalTypes()
        {
            var result = await _rentalTypeService.GetAllRentalTypesAsync();
            return HandleResponse(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRentalType([FromBody] CreateRentalTypeDTO rentalTypeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _rentalTypeService.CreateRentalTypeAsync(rentalTypeDto);
            return HandleResponse(result);
        }
    }
}
