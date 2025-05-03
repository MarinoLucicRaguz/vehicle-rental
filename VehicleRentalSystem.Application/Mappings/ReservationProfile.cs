using AutoMapper;
using VehicleRentalSystem.Application.DTOs.Reservations;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Mappings
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<CreateReservationDTO, Reservation>();
        }
    }
}
