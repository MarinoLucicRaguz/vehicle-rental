using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Domain.Enums;

namespace VehicleRentalSystem.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class MetadataController : BaseApiController
    {
        [HttpGet("reservation-statuses")]
        public ActionResult<ServiceResponse<List<EnumOptionsDTO>>> GetReservationStatuses()
        {
            var statuses = EnumOptionsHelper.Build<ReservationStatus>(ReservationStatusExtensions.GetDisplayName);
            var response = ApiResponse.Success(statuses, "Uspješno dohvaćeni statusi rezervacije.");
            return Ok(response);
        }

        [HttpGet("payment-methods")]
        public ActionResult<List<EnumOptionsDTO>> GetPaymentMethods()
        {
            var paymentMethods = EnumOptionsHelper.Build<PaymentMethod>(PaymentMethodExtensions.GetDisplayName);
            var response = ApiResponse.Success(paymentMethods, "Uspješno dohvaćene metode plaćanja.");
            return Ok(response);
        }
    }
}
