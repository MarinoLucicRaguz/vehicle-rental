using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface IVehicleTypeService
    {
        //Task<ServiceResponse<int>> CreateVehicleTypeAsync(CreateVehicleTypeDTO vehicleType);
        Task<ServiceResponse<List<VehicleType>>> GetAllVehicleTypesAsync();
        Task<ServiceResponse<VehicleType>> GetVehicleTypeByIdAsync(int id);
        //Task<ServiceResponse<bool>> UpdateVehicleTypeAsync(int id, UpdateVehicleTypeDTO vehicleType);
        //Task<ServiceResponse<bool>> DeleteVehicleTypeAsync(int id);
    }
}
