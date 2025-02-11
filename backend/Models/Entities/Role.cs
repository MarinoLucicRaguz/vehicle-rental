using backend.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace backend.Models.Entities
{
    public class Role : IdentityRole<int>
    {
        public string? Description { get; set; }
        public RoleRights LocationRules { get; set; }
        public RoleRights VehicleRules { get; set; }
        public RoleRights ReservationRules { get; set; }
        public RoleRights BookingOptionRules { get; set; }
        public RoleRights RolesRules { get; set; }
        public RoleRights SettingsRules { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
