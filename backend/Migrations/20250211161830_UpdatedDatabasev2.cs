using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDatabasev2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingOptionRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LocationRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReservationRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RolesRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SettingsRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VehicleRules",
                table: "AspNetRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookingOptionRules",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "LocationRules",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "ReservationRules",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "RolesRules",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "SettingsRules",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "VehicleRules",
                table: "AspNetRoles");
        }
    }
}
