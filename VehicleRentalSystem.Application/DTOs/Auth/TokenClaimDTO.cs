﻿namespace VehicleRentalSystem.Application.DTOs.Auth
{
    public class TokenClaimDTO
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
