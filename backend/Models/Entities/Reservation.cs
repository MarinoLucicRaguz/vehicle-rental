namespace backend.Models.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "EUR";
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public string? OwnerName { get; set; }
        public string? OwnerContact { get; set; }
        public decimal? Deposit { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int RentalOptionId { get; set; }
        public RentalOption RentalOption { get; set; } = new RentalOption();
        public string? ExternalReservationId { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; } = new Location();
        public ICollection<ReservationVehicle> ReservationVehicles { get; set; } = new List<ReservationVehicle>();
    }
}
