using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Vehicles;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;
using AutoMapper;
using System.Collections.Generic;

namespace VehicleRentalSystem.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;

        public VehicleService(IVehicleRepository vehicleRepository, IMapper mapper)
        {
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<int>> CreateVehicleAsync(CreateVehicleDTO vehicle)
        {
            var existingVehicle = await _vehicleRepository.GetVehicleByRegistrationAsync(vehicle.Registration);

            if (existingVehicle != null)
                return ApiResponse.Failure<int>("Vozilo s ovom registracijom već postoji.");

            var mappedVehicle = _mapper.Map<Vehicle>(vehicle);
            var createdVehicleId = await _vehicleRepository.CreateVehicleAsync(mappedVehicle);

            return ApiResponse.Created<int>(createdVehicleId, "Uspješno kreirano vozilo.");
        }

        public async Task<ServiceResponse<List<Vehicle>>> GetAllVehiclesAsync()
        {
            var vehicles = await _vehicleRepository.GetAllVehiclesAsync();

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
