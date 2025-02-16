using backend.Models.Entities;

namespace backend.Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<Location>> GetAllLocations();
        Task<Location?> GetLocationById(int id);
        Task<Location?> GetLocationByName(string name);
        Task<Location> AddLocation(Location location);
        Task<Location> UpdateLocation(Location location);
        Task<bool> DeleteLocation(int id);
    }
}
