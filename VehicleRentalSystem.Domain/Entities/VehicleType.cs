namespace VehicleRentalSystem.Domain.Entities
{
    public class VehicleType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<RentalType> RentalTypes { get; set; } = new();
    }
}
