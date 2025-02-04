using System.Data;

namespace backend.Models.Entities
{
    public class User
    {
        public int Id { get; set; }

        // Unique username for login
        public string Username { get; set; } = string.Empty;

        // Store hashed password
        public string PasswordHash { get; set; } = string.Empty;

        // Optional: Preferred timezone (e.g., "Europe/Paris")
        public string? PreferredTimezone { get; set; }

        // Timestamps stored in UTC
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Each user has exactly one role.
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;

    }
}
