using VehicleRentalSystem.Domain.Entities;
namespace VehicleRentalSystem.Domain.Repositories.Interfaces
{
    public interface IVehicleTypeRepository
    {
        Task<List<VehicleType>> GetVehicleTypesByIdsAsync(List<int> ids);
    }
}
