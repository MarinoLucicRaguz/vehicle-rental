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
            services.AddAutoMapper(typeof(VehicleProfile).Assembly);


            // Add application services here
            return services;
        }
    }
}
