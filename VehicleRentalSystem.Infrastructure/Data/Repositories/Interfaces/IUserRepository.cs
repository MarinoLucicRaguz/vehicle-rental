using VehicleRentalSystem.Domain.Entities;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task AddUserAsync(User user);
        public Task<User?> GetUserByIdAsync(string id);
        public Task<User?> GetUserByUsernameAsync(string username);
    }
}
