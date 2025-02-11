using backend.Models.Entities;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehicles()
        {
            return await _vehicleRepository.GetAllVehicles();
        }

        public async Task<Vehicle> GetVehicleById(int id)
        {
            return await _vehicleRepository.GetVehicleById(id);
        }

        public async Task<Vehicle> AddVehicle(Vehicle vehicle)
        {
            return await _vehicleRepository.AddVehicle(vehicle);
        }

        public async Task<Vehicle> UpdateVehicle(Vehicle vehicle)
        {
            return await _vehicleRepository.UpdateVehicle(vehicle);
        }

        public async Task<bool> DeleteVehicle(int id)
        {
            return await _vehicleRepository.DeleteVehicle(id);
        }
    }
}
