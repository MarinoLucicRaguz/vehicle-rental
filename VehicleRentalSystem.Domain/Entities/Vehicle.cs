namespace VehicleRentalSystem.Domain.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; } = new VehicleType();
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Registration { get; set; } = string.Empty;
        public int Year { get; set; }
        public int? PeopleCapacity { get; set; }
        public decimal? FuelCapacity { get; set; }
        public decimal? FuelConsumption { get; set; }
        public string? Description { get; set; }
        public bool Status { get; set; } = true;
        public int LocationId { get; set; }
        public Location Location { get; set; } = new Location();
    }
}
