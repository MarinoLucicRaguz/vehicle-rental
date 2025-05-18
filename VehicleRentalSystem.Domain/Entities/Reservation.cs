using VehicleRentalSystem.Domain.Enums;

namespace VehicleRentalSystem.Domain.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public string? BookingNumber { get; set; }
        public DateTime ReservationDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Deposit { get; set; }
        public decimal? Discount { get; set; }
        public bool Payed { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.CreditCard;
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
        public string? ContactName { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string Notes { get; set; } = string.Empty;
        public int UserId { get; set; }
        public User? User { get; set; }
        public int RentalTypeId { get; set; }
        public RentalType? RentalType { get; set; }
        public List<Vehicle>? Vehicles { get; set; }
        public int LocationId { get; set; }
        public Location? Location { get; set; }
    }
}
