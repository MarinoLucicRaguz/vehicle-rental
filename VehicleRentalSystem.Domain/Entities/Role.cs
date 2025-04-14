using Microsoft.AspNetCore.Identity;

namespace VehicleRentalSystem.Domain.Entities
{
    public class Role : IdentityRole<int>
    {
        public string RoleName { get; set; } = string.Empty;
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
