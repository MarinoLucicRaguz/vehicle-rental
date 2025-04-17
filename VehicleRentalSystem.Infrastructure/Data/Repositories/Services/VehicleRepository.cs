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

        public async Task<Vehicle?> GetVehicleByRegistrationAsync(string registration)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Registration == registration);
            return vehicle;
        }
    }
}
