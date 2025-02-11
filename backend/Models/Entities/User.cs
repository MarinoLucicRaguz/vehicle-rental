using Microsoft.AspNetCore.Identity;

namespace backend.Models.Entities
{
    public class User : IdentityUser<int>
    {
        public string? PreferredTimezone { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int? RoleId { get; set; }
        public Role? Role { get; set; } = null;
    }
}
