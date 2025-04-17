namespace VehicleRentalSystem.Domain.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public List<VehicleType> VehicleTypesAllowed { get; set;} = new List<VehicleType>();
    }
}
