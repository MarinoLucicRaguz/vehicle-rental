using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.RentalTypes;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface IRentalTypeService
    {
        Task<ServiceResponse<List<RentalType>>> GetAllRentalTypesAsync();
        //Task<ServiceResponse<RentalTypeDTO>> GetRentalTypeByIdAsync(int id);
        Task<ServiceResponse<int>> CreateRentalTypeAsync(CreateRentalTypeDTO rentalType);
        //Task<ServiceResponse<bool>> UpdateRentalTypeAsync(int id, UpdateRentalTypeDTO rentalType);
        Task<ServiceResponse<bool>> DeleteRentalTypeAsync(int id);
    }
}
