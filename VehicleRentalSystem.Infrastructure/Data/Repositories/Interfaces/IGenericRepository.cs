using System.Linq.Expressions;

namespace VehicleRentalSystem.Infrastructure.Data.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>>? queryBuilder = null);
        Task<T> CreateAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(int id);
    }
}
