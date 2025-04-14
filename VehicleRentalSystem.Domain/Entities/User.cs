using Microsoft.AspNetCore.Identity;

namespace VehicleRentalSystem.Domain.Entities
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public Role Role { get; set; } = new Role();
    }
}
