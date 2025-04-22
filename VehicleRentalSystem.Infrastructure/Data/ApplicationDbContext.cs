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
            modelBuilder.Entity<Vehicle>().HasOne(v => v.VehicleType)
                .WithMany()
                .HasForeignKey(v => v.VehicleTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Vehicle>().HasOne(v => v.Location)
                .WithMany(l => l.Vehicles)
                .HasForeignKey(v => v.LocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<VehicleType>().HasData(
                new VehicleType { Id = 1, Name = "Jetski" },
                new VehicleType { Id = 2, Name = "Automobil" }
            );

            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "User", NormalizedName = "USER" },
                new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            );

            base.OnModelCreating(modelBuilder);
        }

        public new DbSet<User> Users { get; set; }
        public new DbSet<Role> Roles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<RentalType> RentalTypes { get; set; }

    }
}
