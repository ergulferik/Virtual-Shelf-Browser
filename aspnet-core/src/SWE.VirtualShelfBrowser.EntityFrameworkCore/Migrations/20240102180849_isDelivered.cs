using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SWE.VirtualShelfBrowser.Migrations
{
    /// <inheritdoc />
    public partial class isDelivered : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelivered",
                table: "AppLendings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelivered",
                table: "AppLendings");
        }
    }
}
