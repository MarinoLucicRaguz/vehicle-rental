using VehicleRentalSystem.Application.DTOs;
using VehicleRentalSystem.Application.DTOs.Reservations;
using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Application.Interfaces
{
    public interface IReservationService
    {
        Task<ServiceResponse<Reservation?>> GetReservationById(int id);
        Task<ServiceResponse<List<Reservation>>> GetAllReservations();
        Task<List<Reservation>> GetReservationsByDate(DateTime date);
        Task<ServiceResponse<List<Reservation>>> GetReservationsByDates(DateTime startDate, DateTime endDate);
        Task<List<Reservation>> GetReservationByLocation(int locationId);
        Task<ServiceResponse<Reservation>> CreateReservation(CreateReservationDTO reservationDto);
        Task<ServiceResponse<bool>> UpdateReservation(int id, CreateReservationDTO reservationDto);
        Task<ServiceResponse<bool>> DeleteReservation(int id);
    }
}
