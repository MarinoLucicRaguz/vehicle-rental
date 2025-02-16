using backend.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DatabaseContext : IdentityDbContext<User, Role, int>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Location>()
                .HasIndex(l => l.Name).IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.DefaultLocation)
                .WithMany(l => l.Vehicles)
                .HasForeignKey(v => v.DefaultLocationId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Role>()
               .HasMany(r => r.Users)
               .WithOne(u => u.Role)
               .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Location)
                .WithMany(l => l.Reservations)
                .HasForeignKey(r => r.LocationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.RentalOption)
                .WithMany()
                .HasForeignKey(r => r.RentalOptionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ReservationVehicle>()
                .HasKey(rv => new { rv.ReservationId, rv.VehicleId });

            modelBuilder.Entity<ReservationVehicle>()
                .HasOne(rv => rv.Reservation)
                .WithMany(r => r.ReservationVehicles)
                .HasForeignKey(rv => rv.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ReservationVehicle>()
                .HasOne(rv => rv.Vehicle)
                .WithMany(v => v.ReservationVehicles)
                .HasForeignKey(rv => rv.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<RentalOption> RentalOptions { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationVehicle> ReservationVehicles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Settings> Settings { get; set; }
    }
}
