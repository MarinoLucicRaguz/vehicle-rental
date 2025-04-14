using VehicleRentalSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace VehicleRentalSystem.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public new DbSet<User> Users { get; set; }
        public new DbSet<Role> Roles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

    }
}
