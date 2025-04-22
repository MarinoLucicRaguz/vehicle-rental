using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface IVehicleTypeRepository
    {
        Task<List<VehicleType>> GetVehicleTypesByIdsAsync(List<int> ids);
    }
}
