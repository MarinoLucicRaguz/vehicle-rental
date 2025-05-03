using AutoMapper;
using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Reservations;
using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Application.Services
{
    public class ReservationService : IReservationService
    {
        //private readonly IReservationRepository _reservationRepository;
        private readonly IGenericRepository<Reservation> _genericRepository;
        private readonly IMapper _mapper;
        public ReservationService(IGenericRepository<Reservation> genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<Reservation>> CreateReservation(CreateReservationDTO reservationDto)
        {
            Reservation reservation = _mapper.Map<Reservation>(reservationDto);

            var result =  await _genericRepository.CreateAsync(reservation);

            return ApiResponse.Created<Reservation>(result, "Uspješno kreirana rezervacija.");
        }

        public async Task<ServiceResponse<bool>> DeleteReservation(int id)
        {
            //return await _genericRepository.DeleteAsync(id);
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<Reservation>>> GetAllReservations()
        {
            var reservations = await _genericRepository.GetAllAsync();
            return ApiResponse.Created<List<Reservation>>(reservations, "Uspješno dohvaćene rezervacije.");
        }

        public async Task<ServiceResponse<Reservation?>> GetReservationById(int id)
        {
            var reservation = await _genericRepository.GetByIdAsync(id);
            return ApiResponse.Created<Reservation?>(reservation, "Uspješno dohvaćena rezervacija.");
        }

        public async Task<ServiceResponse<List<Reservation>>> GetReservationByLocation(int locationId)
        {
            //var reservations = await _genericRepository.GetAllAsync(x => x.Where(r => r.LocationId == locationId));
            //return reservations;
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<Reservation>>> GetReservationsByDate(DateTime date)
        {
            //var reservation 
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<Reservation>>> GetReservationsByDates(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<bool>> UpdateReservation(int id, CreateReservationDTO reservationDto)
        {
            throw new NotImplementedException();
        }

        Task<List<Reservation>> IReservationService.GetReservationByLocation(int locationId)
        {
            throw new NotImplementedException();
        }

        Task<List<Reservation>> IReservationService.GetReservationsByDate(DateTime date)
        {
            throw new NotImplementedException();
        }
    }
}
