using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetAllVehicles();
        Task<Vehicle>? GetVehicleById(int id);
        Task<Vehicle> AddVehicle(Vehicle vehicle);
        Task<Vehicle> UpdateVehicle(Vehicle vehicle);
        Task<bool> DeleteVehicle(int id);
    }
}
