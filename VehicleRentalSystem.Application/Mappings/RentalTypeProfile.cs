using AutoMapper;
using VehicleRentalSystem.Application.DTOs.RentalTypes;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Mappings
{
    public class RentalTypeProfile : Profile
    {
        public RentalTypeProfile()
        {
            CreateMap<CreateRentalTypeDTO, RentalType>()
                .ForMember(dest => dest.AvailableVehicleType, opt => opt.Ignore());
        }
    }
}
