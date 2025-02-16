using backend.Models.Entities;
using backend.Repositories;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<Location> AddLocation(Location location)
        {
            return await _locationRepository.AddLocation(location);
        }

        public async Task<bool> DeleteLocation(int id)
        {
            return await _locationRepository.DeleteLocation(id);
        }

        public async Task<IEnumerable<Location>> GetAllLocations()
        {
            return await _locationRepository.GetAllLocations();
        }

        public async Task<Location?> GetLocationById(int id)
        {
            return await _locationRepository.GetLocationById(id);
        }

        public async Task<Location?> GetLocationByName(string name)
        {
            return await _locationRepository.GetLocationByName(name);
        }

        public async Task<Location> UpdateLocation(Location location)
        {
            return await _locationRepository.UpdateLocation(location);
        }
    }
}
