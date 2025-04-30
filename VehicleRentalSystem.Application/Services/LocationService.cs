using AutoMapper;
using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Location;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Application.Services
{
    public class LocationService : ILocationService
    {
        private readonly IGenericRepository<Location> _genericRepo;
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public LocationService(IGenericRepository<Location> genericRepo, ILocationRepository locationRepository, IMapper mapper)
        {
            _genericRepo = genericRepo;
            _locationRepository = locationRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<int>> CreateLocationAsync(CreateLocationDTO locationDto)
        {
            var existingLocation = await _locationRepository.GetLocationByNameAsync(locationDto.Name);

            if (existingLocation != null)
                return ApiResponse.Failure<int>("Lokacija s ovim imenom već postoji."); 

            var location = _mapper.Map<Location>(locationDto);
            var createdLocation = await _genericRepo.CreateAsync(location);
            return ApiResponse.Created<int>(createdLocation.Id, "Lokacija uspješno kreirana.");
        }

        public async Task<ServiceResponse<List<Location>>> GetAllLocationsAsync()
        {
            var locations = await _genericRepo.GetAllAsync();

            if (locations == null)
                return ApiResponse.Failure<List<Location>>("Pogreška prilikom dohvaćanja lokacija.");

            return ApiResponse.Success(locations, "Uspješno dohvaćene lokacije.");
        }
    }
}
