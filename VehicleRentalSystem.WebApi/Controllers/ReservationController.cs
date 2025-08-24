using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleRentalSystem.Application.DTOs.Reservations;
using VehicleRentalSystem.Application.Interfaces;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReservationController : BaseApiController
    {
        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReservations()
        {
            var result = await _reservationService.GetAllReservations();
            return HandleResponse(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationDTO reservationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _reservationService.CreateReservation(reservationDto);
            return HandleResponse(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteReservation([FromQuery] int id)
        {
            var result = await _reservationService.DeleteReservation(id);
            return HandleResponse(result);
        }
    }
}
