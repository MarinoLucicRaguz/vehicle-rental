using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ReservationVehicle>().HasKey(rv => new { rv.ReservationId, rv.VehicleId });
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<RentalOption> RentalOptions { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationVehicle> ReservationVehicles { get; set; }
        public DbSet<Location> Locations { get; set; }
    }
}
