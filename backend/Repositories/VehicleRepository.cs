using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DatabaseContext _context;

        public VehicleRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Vehicle> AddVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }

        public async Task<bool> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
                return false;

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehicles()
        {
            return await _context.Vehicles.ToListAsync();
        }

        public async Task<Vehicle>? GetVehicleById(int id)
        {
            var result = await _context.Vehicles.FindAsync(id);
            return result;
        }

        public async Task<Vehicle> UpdateVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Update(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }
    }
}
