using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _context;

        public ReservationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetReservationsInPeriod(DateTime startTime, DateTime endTime)
        { 
            return await _context.Reservations.Where(r => r.StartTime >= startTime && r.EndTime <= endTime).ToListAsync();
        }
    }
}
