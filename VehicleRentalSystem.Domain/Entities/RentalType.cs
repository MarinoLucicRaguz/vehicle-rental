namespace VehicleRentalSystem.Domain.Entities
{
    public class RentalType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public int Duration { get; set; } = 0;
        public string DurationUnit { get; set; } = "Minutes";
        //mozda enumerizirat
        public bool IsPerPerson { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public bool FuelIncluded { get; set; } = false;
        public int? MaxPassengers { get; set; } = null;
        public List<VehicleType> AvailableVehicleType { get; set; } = new List<VehicleType>();
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
