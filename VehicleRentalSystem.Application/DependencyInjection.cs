using VehicleRentalSystem.Application.Helpers;
using VehicleRentalSystem.Application.Interfaces;
using VehicleRentalSystem.Application.Mappings;
using VehicleRentalSystem.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace VehicleRentalSystem.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<JwtTokenHelper>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<IVehicleTypeService, VehicleTypeService>();
            services.AddScoped<IRentalTypeService, RentalTypeService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddAutoMapper(typeof(VehicleProfile).Assembly);
            services.AddAutoMapper(typeof(LocationProfile).Assembly);

            return services;
        }
    }
}
