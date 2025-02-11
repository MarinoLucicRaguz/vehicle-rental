namespace backend.Models.Entities
{
    public class RentalOption
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; } = 0m;
        public int Duration { get; set; } 
        public int? MinVehicleNumber { get; set; }
        public int? MaxVehicleNumber { get; set; }
        public int? MinPeopleNumber { get; set; }
        public int? MaxPeopleNumber { get; set; }
        public bool PricePerPerson { get; set; } = false;
        public bool PricePerVehicle { get; set; } = false;
        public bool Available { get; set; } = false;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
