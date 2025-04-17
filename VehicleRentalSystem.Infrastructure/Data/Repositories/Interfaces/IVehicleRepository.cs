using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<Vehicle?> GetVehicleByRegistrationAsync(string registration);
    }
}
