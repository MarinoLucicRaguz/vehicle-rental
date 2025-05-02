using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.RentalTypes;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Application.Services
{
    public class RentalTypeService : IRentalTypeService
    {
        private readonly IGenericRepository<RentalType> _genericRepository;
        private readonly IGenericRepository<VehicleType> _genericVehicleTypeRepository;
        private readonly IVehicleTypeRepository _vehicleTypeRepository;
        private readonly IMapper _mapper;

        public RentalTypeService(IGenericRepository<RentalType> genericRepository, IGenericRepository<VehicleType> genericVehicleTypeRepository, IVehicleTypeRepository vehicleTypeRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _genericVehicleTypeRepository = genericVehicleTypeRepository;
            _vehicleTypeRepository = vehicleTypeRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<int>> CreateRentalTypeAsync(CreateRentalTypeDTO rentalTypDto)
        {
            if (rentalTypDto.AvailableVehicleTypeIds == null || !rentalTypDto.AvailableVehicleTypeIds.Any())
                return ApiResponse.Failure<int>("Nije odabran tip vozila za ovaj tip najma.");

            var vehicleTypes = await _vehicleTypeRepository.GetVehicleTypesByIdsAsync(rentalTypDto.AvailableVehicleTypeIds);
            if (vehicleTypes == null)
                return ApiResponse.Failure<int>("Dogodila se pogreška prilikom dohvaćanja tipa vozila.");

            //mozda provjeriti moze li se umjesto pridjelivanja samo s ideom to napravit
            var mappedRentalType = _mapper.Map<RentalType>(rentalTypDto);
            mappedRentalType.AvailableVehicleType = vehicleTypes;

            var createdRentalType = await _genericRepository.CreateAsync(mappedRentalType);

            return ApiResponse.Created<int>(mappedRentalType.Id, "Uspješno kreirana opcija najma.");
        }

        public Task<ServiceResponse<bool>> DeleteRentalTypeAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<RentalType>>> GetAllRentalTypesAsync()
        {
            var rentalTypes = await _genericRepository.GetAllAsync(rt => rt.Include(x => x.AvailableVehicleType));
            
            if (rentalTypes == null)
                return ApiResponse.Failure<List<RentalType>>("Pogreška prilikom dohvaćanja tipova najma.");

            return ApiResponse.Success(rentalTypes, "Uspješno dohvaćeni tipovi najma.");
        }
    }
}
