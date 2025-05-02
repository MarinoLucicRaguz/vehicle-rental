using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Domain.Repositories.Interfaces
{
    public interface ILocationRepository
    {
        Task<Location?> GetLocationByNameAsync(string name);
    }
}
