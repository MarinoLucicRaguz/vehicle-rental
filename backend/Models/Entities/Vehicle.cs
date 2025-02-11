namespace backend.Models.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string VehicleType { get; set; } = string.Empty;
        public string? Registration { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public int? Year { get; set; }
        public int? PersonCapacity { get; set; }
        public decimal? FuelCapacity { get; set; } = 0m;
        public decimal? FuelConsumption { get; set; } = 0m;
        public string? Description { get; set; }
        public string? Status { get; set; }
        public int? DefaultLocationId { get; set; }
        public Location? DefaultLocation { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<RentalOption> RentalOptions { get; set; } = new List<RentalOption>();
        public ICollection<ReservationVehicle> ReservationVehicles { get; set; } = new List<ReservationVehicle>();
    }
}
