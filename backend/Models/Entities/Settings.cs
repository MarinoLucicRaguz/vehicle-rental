namespace backend.Models.Entities
{
    public class Settings
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public TimeOnly StartingTime { get; set; }
        public TimeOnly EndingTime { get; set; }
        public string? Version { get; set; }
    }
}
