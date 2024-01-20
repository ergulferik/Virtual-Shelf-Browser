using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SWE.VirtualShelfBrowser.Migrations
{
    /// <inheritdoc />
    public partial class LenderName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LenderName",
                table: "AppLendings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LenderName",
                table: "AppLendings");
        }
    }
}
