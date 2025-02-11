using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalOptions_Vehicles_VehicleId",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "RentalPeriod",
                table: "RentalOptions");

            migrationBuilder.RenameColumn(
                name: "RegistrationNumber",
                table: "Vehicles",
                newName: "Registration");

            migrationBuilder.RenameColumn(
                name: "OptionName",
                table: "RentalOptions",
                newName: "Name");

            migrationBuilder.AddColumn<decimal>(
                name: "FuelCapacity",
                table: "Vehicles",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FuelConsumption",
                table: "Vehicles",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonCapacity",
                table: "Vehicles",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "Reservations",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "PaymentStatus",
                table: "Reservations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RentalOptionId",
                table: "Reservations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "RentalOptions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "RentalOptions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "RentalOptions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaxPeopleNumber",
                table: "RentalOptions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxVehicleNumber",
                table: "RentalOptions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MinPeopleNumber",
                table: "RentalOptions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MinVehicleNumber",
                table: "RentalOptions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PricePerPerson",
                table: "RentalOptions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PricePerVehicle",
                table: "RentalOptions",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RentalOptionId",
                table: "Reservations",
                column: "RentalOptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalOptions_Vehicles_VehicleId",
                table: "RentalOptions",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations",
                column: "RentalOptionId",
                principalTable: "RentalOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalOptions_Vehicles_VehicleId",
                table: "RentalOptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_RentalOptions_RentalOptionId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_RentalOptionId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "FuelCapacity",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "FuelConsumption",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PersonCapacity",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "RentalOptionId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Available",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "MaxPeopleNumber",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "MaxVehicleNumber",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "MinPeopleNumber",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "MinVehicleNumber",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "PricePerPerson",
                table: "RentalOptions");

            migrationBuilder.DropColumn(
                name: "PricePerVehicle",
                table: "RentalOptions");

            migrationBuilder.RenameColumn(
                name: "Registration",
                table: "Vehicles",
                newName: "RegistrationNumber");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "RentalOptions",
                newName: "OptionName");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleId",
                table: "RentalOptions",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "RentalOptions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Quantity",
                table: "RentalOptions",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RentalPeriod",
                table: "RentalOptions",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RentalOptions_Vehicles_VehicleId",
                table: "RentalOptions",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
