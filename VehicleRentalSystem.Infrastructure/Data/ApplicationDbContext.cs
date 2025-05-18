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

            modelBuilder.Entity<VehicleType>().HasMany(vt => vt.RentalTypes)
                .WithMany(rt => rt.AvailableVehicleType)
                .UsingEntity(j => j.ToTable("VehicleTypeRentalType"));

            modelBuilder.Entity<Reservation>().HasMany(r => r.Vehicles)
                .WithMany(v => v.Reservations)
                .UsingEntity(j => j.ToTable("ReservationVehicle"));

            modelBuilder.Entity<Reservation>().HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reservation>().HasOne(r => r.Location)
                .WithMany(l => l.Reservations)
                .HasForeignKey(r => r.LocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reservation>().HasOne(r => r.RentalType)
                .WithMany(rt => rt.Reservations)
                .HasForeignKey(r => r.RentalTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<VehicleType>().HasData(
            //    new VehicleType { Id = 1, Name = "Jetski" },
            //    new VehicleType { Id = 2, Name = "Automobil" }
            //);

            //modelBuilder.Entity<Role>().HasData(
            //    new Role { Id = 1, Name = "User", NormalizedName = "USER" },
            //    new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            //);

            base.OnModelCreating(modelBuilder);
        }

        public new DbSet<User> Users { get; set; }
        public new DbSet<Role> Roles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<RentalType> RentalTypes { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

    }
}
