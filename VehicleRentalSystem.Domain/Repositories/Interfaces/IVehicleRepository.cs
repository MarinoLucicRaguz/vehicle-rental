using VehicleRentalSystem.Domain.Entities;
namespace VehicleRentalSystem.Domain.Repositories.Interfaces
{
    public interface IVehicleRepository
    {
        Task<Vehicle?> GetVehicleByRegistrationAsync(string registration);
    }
}
