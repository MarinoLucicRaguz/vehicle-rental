using VehicleRentalSystem.Application.DTOs;

namespace VehicleRentalSystem.Application.Helpers
{
    public static class ApiResponse
    {
        public static ServiceResponse<T> Success<T>(T data, string? message = null)
        {
            return new ServiceResponse<T> { Data = data, Message = message, Success = true, StatusCode = 200 };
        }

        public static ServiceResponse<T> Created<T>(T data, string? message = null)
        {
            return new ServiceResponse<T> { Data = data, Message = message, Success = true, StatusCode = 201 };
        }

        public static ServiceResponse<T> Failure<T>(string message)
        {
            return new ServiceResponse<T> { Data = default, Message = message, Success = false, StatusCode = 400 };
        }

        public static ServiceResponse<T> Unauthorized<T>(string message)
        {
            return new ServiceResponse<T> { Data = default, Message = message, Success = false, StatusCode = 401 };
        }

        public static ServiceResponse<T> Forbidden<T>(string message)
        {
            return new ServiceResponse<T> { Data = default, Message = message, Success = false, StatusCode = 403 };
        }

        public static ServiceResponse<T> NotFound<T>(string message)
        {
            return new ServiceResponse<T> { Data = default, Message = message, Success = false, StatusCode = 404 };
        }

        public static ServiceResponse<T> ValidationError<T>(string message)
        {
            return new ServiceResponse<T> { Data = default, Message = message, Success = false, StatusCode = 422 };
        }
    }
}

