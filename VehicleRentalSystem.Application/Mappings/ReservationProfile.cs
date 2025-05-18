using AutoMapper;
using VehicleRentalSystem.Application.DTOs.Reservations;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Mappings
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<CreateReservationDTO, Reservation>()
                .ForMember(dest => dest.Vehicles, opt => opt.MapFrom(src => VehicleMapping(src.VehicleIds)));
        }

        private List<Vehicle> VehicleMapping(List<int> vehicleIds)
        {
            List<Vehicle> listVehicles = new List<Vehicle>();
            foreach (int id in vehicleIds)
            {
                listVehicles.Add(new Vehicle { Id = id });
            }
            return listVehicles;
        }
    }
}
