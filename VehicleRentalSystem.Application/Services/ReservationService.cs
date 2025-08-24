using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

            string bookingNumber = await GenerateUniqueSifra(reservationDto.LocationName ?? "");
            reservation.BookingNumber = bookingNumber;
            var result = await _genericRepository.CreateAsync(reservation);

            return ApiResponse.Created(result, "Uspješno kreirana rezervacija.");
        }

        private async Task<string> GenerateUniqueSifra(string location)
        {
            var prefix = new string(location.Take(3).ToArray()).ToUpper().PadRight(3, 'X');
            var timestamp = DateTime.UtcNow.ToString("yyMMddHHmmss");
            var timePart = timestamp.Substring(4, 4);

            var count = await _genericRepository.CountAsync() + 1;
            var countPart = (count % 1000).ToString("D3");

            var code = $"{prefix}{timePart}{countPart}";

            bool exists = await _genericRepository.ExistsAsync(r => r.BookingNumber == code);
            if (exists)
            {
                var rnd = new Random().Next(100, 999).ToString();
                code = $"{prefix}{timePart.Substring(0, 2)}{rnd}";
            }

            return code.Substring(0, 10);
        }

        public async Task<ServiceResponse<bool>> DeleteReservation(int id)
        {
            var reservation = await _genericRepository.GetByIdAsync(id);

            if (reservation == null)
            {
                return ApiResponse.Failure<bool>("Nije pronađena rezervacija.");
            }

            if (reservation.Status != Domain.Enums.ReservationStatus.Pending || reservation.Status != Domain.Enums.ReservationStatus.Confirmed)
            {
                var odgovor = await _genericRepository.DeleteAsync(id);
                return ApiResponse.Success(odgovor, "Uspješno izbrisana rezervacija.");
            }

            return ApiResponse.Failure<bool>("Rezervacija se ne može izbrisati zbog svog statusa.");
        }

        public async Task<ServiceResponse<List<Reservation>>> GetAllReservations()
        {
            var reservations = await _genericRepository.GetAllAsync(r => r.Include(x => x.Vehicles).Include(x => x.Location).Include(x => x.RentalType));
            return ApiResponse.Created(reservations, "Uspješno dohvaćene rezervacije.");
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
