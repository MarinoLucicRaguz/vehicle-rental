namespace VehicleRentalSystem.Application.DTOs.Vehicles
{
    public class CreateVehicleDTO
    {
        public int VehicleTypeId { get; set; }
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
    }
}
