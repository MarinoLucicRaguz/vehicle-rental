using Microsoft.AspNetCore.Identity;

namespace backend.Models.Entities
{
    public class User : IdentityUser<int>
    {
        public string? PreferredTimezone { get; set; }

        // Timestamps stored in UTC
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Each user has exactly one role.
        public int? RoleId { get; set; }
        public Role? Role { get; set; } = null;

    }
}
