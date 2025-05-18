using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IGenericRepository<Vehicle> _genericRepo;
        private readonly IGenericRepository<Location> _locationRepository;
        private readonly IGenericRepository<VehicleType> _vehicleTypeRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;

        public VehicleService(IGenericRepository<Vehicle> genericRepo, IVehicleRepository vehicleRepository, IMapper mapper, IGenericRepository<Location> locationRepository, IGenericRepository<VehicleType> vehicleTypeRepository)
        {
            _genericRepo = genericRepo;
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
            _locationRepository = locationRepository;
            _vehicleTypeRepository = vehicleTypeRepository;
        }

        public async Task<ServiceResponse<int>> CreateVehicleAsync(CreateVehicleDTO vehicle)
        {
            var existingVehicle = await _vehicleRepository.GetVehicleByRegistrationAsync(vehicle.Registration);

            if (existingVehicle != null)
                return ApiResponse.Failure<int>("Vozilo s ovom registracijom već postoji.");

            var location = await _locationRepository.GetByIdAsync(vehicle.LocationId);
            if (location == null)
                return ApiResponse.Failure<int>("Lokacija nije pronađena.");

            var typeEntity = await _vehicleTypeRepository.GetByIdAsync(vehicle.VehicleTypeId);
            if (typeEntity == null)
                return ApiResponse.Failure<int>("Tip vozila nije pronađen.");

            var mappedVehicle = _mapper.Map<Vehicle>(vehicle);

            var createdVehicle = await _genericRepo.CreateAsync(mappedVehicle);

            return ApiResponse.Created<int>(createdVehicle.Id, "Uspješno kreirano vozilo.");
        }

        public async Task<ServiceResponse<List<Vehicle>>> GetAllVehiclesAsync()
        {
            var vehicles = await _genericRepo.GetAllAsync(query => query.Include(v => v.Location).Include(v => v.VehicleType));

            if (vehicles == null)
                return ApiResponse.Failure<List<Vehicle>>("Pogreška prilikom dohvaćanja vozila.");

            return ApiResponse.Success(vehicles, "Uspješno dohvaćena vozila.");
        }

        public Task<ServiceResponse<bool>> DeleteVehicleAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
