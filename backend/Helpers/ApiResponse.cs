using backend.Models.DTOs;

namespace backend.Helpers
{
    public static class ApiResponse
    {
        public static ServiceResponse<T> Success<T>(T data, string? message = null)
        {
            return new ServiceResponse<T>
            {
                Data = data,
                Message = message,
                Success = true
            };
        }
        public static ServiceResponse<T> Failure<T>(string message)
        {
            return new ServiceResponse<T>
            {
                Data = default,
                Message = message,
                Success = false
            };
        }
    }
}
