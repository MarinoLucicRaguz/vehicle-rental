using AutoMapper;
using VehicleRentalSystem.Application.DTOs.Location;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Mappings
{
    public class LocationProfile : Profile
    {
        public LocationProfile()
        {
            CreateMap<CreateLocationDTO, Location>();
        }
    }
}
