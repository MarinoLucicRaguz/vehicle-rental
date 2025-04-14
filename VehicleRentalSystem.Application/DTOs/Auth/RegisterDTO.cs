namespace VehicleRentalSystem.Application.DTOs.Auth
{
    public class RegisterDTO : LoginDTO
    {
        public string ConfirmPassword { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
