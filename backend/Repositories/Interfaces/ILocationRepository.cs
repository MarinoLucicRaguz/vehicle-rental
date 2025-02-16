using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface ILocationRepository 
    {
        Task<IEnumerable<Location>> GetAllLocations();
        Task<Location?> GetLocationById(int id);
        Task<Location?> GetLocationByName(string name);
        Task<Location> AddLocation(Location location);
        Task<Location> UpdateLocation(Location vehicle);
        Task<bool> DeleteLocation(int id);
    }
}
