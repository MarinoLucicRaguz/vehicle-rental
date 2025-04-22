using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;

namespace VehicleRentalSystem.Application.Services
{
    class VehicleTypeService : IVehicleTypeService
    {
        private readonly IGenericRepository<VehicleType> _genericRepository;
        public VehicleTypeService(IGenericRepository<VehicleType> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public async Task<ServiceResponse<List<VehicleType>>> GetAllVehicleTypesAsync()
        {
            var vehicleTypes = await _genericRepository.GetAllAsync();

            if (vehicleTypes == null)
                return ApiResponse.Failure<List<VehicleType>>("Pogreška prilikom dohvaćanja tipova vozila.");

            return ApiResponse.Success(vehicleTypes, "Uspješno dohvaćeni tipovi vozila.");
        }

        public async Task<ServiceResponse<VehicleType>> GetVehicleTypeByIdAsync(int id)
        {
            var vehicleType = await _genericRepository.GetByIdAsync(id);

            if (vehicleType == null)
                return ApiResponse.Failure<VehicleType>("Tip vozila nije pronađen.");

            return ApiResponse.Success(vehicleType, "Uspješno dohvaćen tip vozila.");
        }
    }
}
