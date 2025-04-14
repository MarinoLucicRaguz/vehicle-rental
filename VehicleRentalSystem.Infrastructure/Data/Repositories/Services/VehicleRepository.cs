using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ApplicationDbContext _context;

        public VehicleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateVehicleAsync(Vehicle vehicle)
        {
            var newVehicle = await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
            return newVehicle.Entity.Id;
        }

        public async Task<Vehicle?> GetVehicleByRegistrationAsync(string registration)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Registration == registration);
            return vehicle;
        }

        public Task<bool> DeleteVehicleAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Vehicle>> GetAllVehiclesAsync()
        {
            var vehicles = await _context.Vehicles.ToListAsync();
            return vehicles;
        }

        public Task<Vehicle?> GetVehicleByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateVehicleAsync(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }
    }
}
