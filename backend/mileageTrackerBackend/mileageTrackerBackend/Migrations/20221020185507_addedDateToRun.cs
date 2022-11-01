using Microsoft.EntityFrameworkCore.Migrations;

namespace mileageTrackerBackend.Migrations
{
    public partial class addedDateToRun : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "LoggedRuns",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "LoggedRuns");
        }
    }
}
