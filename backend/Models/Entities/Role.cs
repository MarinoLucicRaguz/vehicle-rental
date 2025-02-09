using Microsoft.AspNetCore.Identity;

namespace backend.Models.Entities
{
    public class Role : IdentityRole<int>
    {
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
