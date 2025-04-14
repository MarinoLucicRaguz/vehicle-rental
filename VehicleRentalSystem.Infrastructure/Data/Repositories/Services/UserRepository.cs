using VehicleRentalSystem.Domain.Entities;
using VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
        }
    }
}
