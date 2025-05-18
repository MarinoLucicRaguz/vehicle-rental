namespace VehicleRentalSystem.Domain.Enums
{
    public enum ReservationStatus
    {
        Pending,
        Confirmed,
        Ongoing,
        Cancelled,
        Completed
    }

    public static class ReservationStatusExtensions
    {
        public static string GetDisplayName(this ReservationStatus status)
        {
            return status switch
            {
                ReservationStatus.Pending => "Na čekanju",
                ReservationStatus.Confirmed => "Potvrđeno",
                ReservationStatus.Ongoing => "U toku",
                ReservationStatus.Cancelled => "Otkazano",
                ReservationStatus.Completed => "Završeno",
                _ => status.ToString()
            };
        }
    }
}
