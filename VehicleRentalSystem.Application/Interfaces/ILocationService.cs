using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Location;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface ILocationService
    {
        Task<ServiceResponse<List<Location>>> GetAllLocationsAsync();
        Task<ServiceResponse<int>> CreateLocationAsync(CreateLocationDTO locationDto);
    }
}
