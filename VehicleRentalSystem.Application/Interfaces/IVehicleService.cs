using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface IVehicleService
    {
        Task<ServiceResponse<int>> CreateVehicleAsync(CreateVehicleDTO vehicle);
        //Task<ServiceResponse<VehicleDTO>> GetVehicleByIdAsync(int id);
        Task<ServiceResponse<List<Vehicle>>> GetAllVehiclesAsync();
        //Task<ServiceResponse<bool>> UpdateVehicleAsync(int id, UpdateVehicleDTO vehicle);
        Task<ServiceResponse<bool>> DeleteVehicleAsync(int id);
    }
}
