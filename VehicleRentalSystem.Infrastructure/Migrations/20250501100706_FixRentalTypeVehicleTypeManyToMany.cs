using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleRentalSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixRentalTypeVehicleTypeManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleTypes_RentalTypes_RentalTypeId",
                table: "VehicleTypes");

            migrationBuilder.DropIndex(
                name: "IX_VehicleTypes_RentalTypeId",
                table: "VehicleTypes");

            migrationBuilder.DropColumn(
                name: "RentalTypeId",
                table: "VehicleTypes");

            migrationBuilder.CreateTable(
                name: "VehicleTypeRentalType",
                columns: table => new
                {
                    AvailableVehicleTypeId = table.Column<int>(type: "integer", nullable: false),
                    RentalTypesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleTypeRentalType", x => new { x.AvailableVehicleTypeId, x.RentalTypesId });
                    table.ForeignKey(
                        name: "FK_VehicleTypeRentalType_RentalTypes_RentalTypesId",
                        column: x => x.RentalTypesId,
                        principalTable: "RentalTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VehicleTypeRentalType_VehicleTypes_AvailableVehicleTypeId",
                        column: x => x.AvailableVehicleTypeId,
                        principalTable: "VehicleTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleTypeRentalType_RentalTypesId",
                table: "VehicleTypeRentalType",
                column: "RentalTypesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleTypeRentalType");

            migrationBuilder.AddColumn<int>(
                name: "RentalTypeId",
                table: "VehicleTypes",
                type: "integer",
                nullable: true);

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
    }
}
