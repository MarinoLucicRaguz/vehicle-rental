namespace backend.Models.Entities
{
    public class ReservationVehicle
    {
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; } = null!;

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; } = null!;
    }
}
