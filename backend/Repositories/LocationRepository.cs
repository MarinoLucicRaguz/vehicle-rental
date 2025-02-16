using backend.Data;
using backend.Models.Entities;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly DatabaseContext _context;

        public LocationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Location> AddLocation(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();
            return location;
        }

        public async Task<Location?> GetLocationByName(string name)
        {
            return await _context.Locations.SingleOrDefaultAsync(l => l.Name.Equals(name));
        }

        public async Task<Location?> GetLocationById(int id)
        {
            return await _context.Locations.FindAsync(id);
        }

        public async Task<IEnumerable<Location>> GetAllLocations()
        {
            return await _context.Locations.ToListAsync();
        }

        public async Task<Location> UpdateLocation(Location location)
        {
            _context.Locations.Update(location);
            await _context.SaveChangesAsync();
            return location;
        }

        public async Task<bool> DeleteLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
                return false;

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
