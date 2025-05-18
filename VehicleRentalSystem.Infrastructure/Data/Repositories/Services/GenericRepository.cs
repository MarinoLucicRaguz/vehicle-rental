using Microsoft.EntityFrameworkCore;
using VehicleRentalSystem.Domain.Repositories.Interfaces;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Services
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>>? queryBuilder = null)
        {
            IQueryable<T> query = _dbSet;

            if (queryBuilder != null)
            {
                query = queryBuilder(query);
            }

            return await query.ToListAsync();
        }

        public async Task<T> CreateAsync(T entity)
        {
            _context.ChangeTracker.TrackGraph(entity, node =>
            {
                var entry = node.Entry;
                if (entry.Properties.Any(p => p.Metadata.IsPrimaryKey() && p.CurrentValue is int id && id > 0))
                    entry.State = EntityState.Unchanged;
                else
                    entry.State = EntityState.Added;
            });

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null) return false;

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
