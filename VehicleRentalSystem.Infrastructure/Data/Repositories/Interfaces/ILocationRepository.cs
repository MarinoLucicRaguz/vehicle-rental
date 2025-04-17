using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface ILocationRepository
    {
        Task<Location?> GetLocationByNameAsync(string name);
    }
}
