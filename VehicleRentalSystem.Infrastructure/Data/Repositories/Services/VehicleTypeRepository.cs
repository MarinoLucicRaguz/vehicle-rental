using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    class VehicleTypeRepository : IVehicleTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public VehicleTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<VehicleType>> GetVehicleTypesByIdsAsync(List<int> ids)
        {
            var vehicleTypes = await _context.VehicleTypes.Where(vt => ids.Contains(vt.Id)).ToListAsync();
            return vehicleTypes;
        }
    }
}
