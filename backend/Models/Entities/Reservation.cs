namespace backend.Models.Entities
{
    public class Reservation
    {
        public int Id { get; set; }

        // If this reservation is imported from an external system like Bokun.
        public string? ExternalReservationId { get; set; }

        // Optionally, the reservation might be associated with a user.
        public int? UserId { get; set; }
        public User? User { get; set; }

        // The location where the reservation begins.
        public int LocationId { get; set; }
        public Location Location { get; set; } = null!;

        // Reservation start and end times (stored in UTC).
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

        // Pricing information
        public decimal Price { get; set; }
        public string Currency { get; set; } = "USD";

        // e.g., "Pending", "Confirmed", "Cancelled", "Completed"
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public string? OwnerName { get; set; }
        public string? OwnerContact { get; set; }
        public decimal? Deposit { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property for the many-to-many relationship with Vehicles.
        public ICollection<ReservationVehicle> ReservationVehicles { get; set; } = new List<ReservationVehicle>();
    }
}
