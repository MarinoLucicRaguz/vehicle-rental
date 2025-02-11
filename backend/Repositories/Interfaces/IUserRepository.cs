using backend.Models.Entities;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
    }
}
