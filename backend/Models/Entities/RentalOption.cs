namespace backend.Models.Entities
{
    public class RentalOption
    {
        public int Id { get; set; }

        // Each rental option is linked to a vehicle.
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; } = null!;

        // e.g. "Daily Rental", "Weekend Special"
        public string OptionName { get; set; } = string.Empty;
        public string? Description { get; set; }

        // Pricing details
        public decimal Price { get; set; }
        public string Currency { get; set; } = "EUR";

        // e.g. "hour", "day", "week"
        public string? RentalPeriod { get; set; }
        // ako je rental period hour a ovo 2 to znaci da je renta na 2h
        public decimal? Quantity { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
