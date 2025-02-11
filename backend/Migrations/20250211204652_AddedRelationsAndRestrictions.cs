using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationsAndRestrictions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservationVehicles_Vehicles_VehicleId",
                table: "ReservationVehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Locations_DefaultLocationId",
                table: "Vehicles");

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyName = table.Column<string>(type: "text", nullable: false),
                    StartingTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndingTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    Version = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations",
                column: "RentalOptionId",
                principalTable: "RentalOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationVehicles_Vehicles_VehicleId",
                table: "ReservationVehicles",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Locations_DefaultLocationId",
                table: "Vehicles",
                column: "DefaultLocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservationVehicles_Vehicles_VehicleId",
                table: "ReservationVehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Locations_DefaultLocationId",
                table: "Vehicles");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations",
                column: "RentalOptionId",
                principalTable: "RentalOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationVehicles_Vehicles_VehicleId",
                table: "ReservationVehicles",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Locations_DefaultLocationId",
                table: "Vehicles",
                column: "DefaultLocationId",
                principalTable: "Locations",
                principalColumn: "Id");
        }
    }
}
