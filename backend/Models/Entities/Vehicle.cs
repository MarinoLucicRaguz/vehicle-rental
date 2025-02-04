namespace backend.Models.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }

        // e.g. "Car", "Jetski"
        public string VehicleType { get; set; } = string.Empty;

        public string? Make { get; set; }
        public string? Model { get; set; }
        public int? Year { get; set; }
        public string? RegistrationNumber { get; set; }
        public string? Description { get; set; }

        // e.g. "Available", "Maintenance"
        public string? Status { get; set; }

        // Default location (pickup/depot) for the vehicle.
        public int? DefaultLocationId { get; set; }
        public Location? DefaultLocation { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<RentalOption> RentalOptions { get; set; } = new List<RentalOption>();

        // A vehicle can be included in multiple reservations.
        public ICollection<ReservationVehicle> ReservationVehicles { get; set; } = new List<ReservationVehicle>();
    }
}
