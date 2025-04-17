using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDbContext _context;

        public LocationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Location?> GetLocationByNameAsync(string name)
        {
            return await _context.Locations.FirstOrDefaultAsync(l => l.Name.ToLower() == name.ToLower());
        }
    }
}
