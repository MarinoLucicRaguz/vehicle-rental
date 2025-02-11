using backend.Models.Entities;

namespace backend.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<IEnumerable<Vehicle>> GetAllVehicles();
        Task<Vehicle> GetVehicleById(int id);
        Task<Vehicle> AddVehicle(Vehicle vehicle);
        Task<Vehicle> UpdateVehicle(Vehicle vehicle);
        Task<bool> DeleteVehicle(int id);
    }
}
