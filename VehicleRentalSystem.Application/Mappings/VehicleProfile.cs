using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Domain.Entities;
using AutoMapper;

namespace VehicleRentalSystem.Application.Mappings
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<CreateVehicleDTO, Vehicle>();
                //.ForMember(dest => dest.VehicleType, opt => opt.Ignore());
        }
    }
}
