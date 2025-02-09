using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions
{
    public static class MigrationExtension
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using DatabaseContext context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

            context.Database.Migrate();
        }
    }
}
