using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Domain.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservationsInPeriod(DateTime startTime, DateTime endTime);
    }
}
