using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<int> CreateVehicleAsync(Vehicle vehicle);
        Task<Vehicle?> GetVehicleByRegistrationAsync(string registration);
        Task<bool> DeleteVehicleAsync(int id);
        Task<Vehicle?> GetVehicleByIdAsync(int id);
        Task<List<Vehicle>> GetAllVehiclesAsync();
        Task<bool> UpdateVehicleAsync(Vehicle vehicle);
    }
}
