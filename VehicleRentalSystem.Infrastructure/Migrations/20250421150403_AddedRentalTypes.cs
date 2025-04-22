using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace VehicleRentalSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedRentalTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RentalTypeId",
                table: "VehicleTypes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RentalTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    DurationUnit = table.Column<string>(type: "text", nullable: false),
                    IsPerPerson = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    FuelIncluded = table.Column<bool>(type: "boolean", nullable: false),
                    MaxPassengers = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalTypes", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "VehicleTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "RentalTypeId",
                value: null);

            migrationBuilder.UpdateData(
                table: "VehicleTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "RentalTypeId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_VehicleTypes_RentalTypeId",
                table: "VehicleTypes",
                column: "RentalTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleTypes_RentalTypes_RentalTypeId",
                table: "VehicleTypes",
                column: "RentalTypeId",
                principalTable: "RentalTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleTypes_RentalTypes_RentalTypeId",
                table: "VehicleTypes");

            migrationBuilder.DropTable(
                name: "RentalTypes");

            migrationBuilder.DropIndex(
                name: "IX_VehicleTypes_RentalTypeId",
                table: "VehicleTypes");

            migrationBuilder.DropColumn(
                name: "RentalTypeId",
                table: "VehicleTypes");
        }
    }
}
