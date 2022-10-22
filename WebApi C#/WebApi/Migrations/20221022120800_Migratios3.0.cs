using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiDaTerra.Migrations
{
    /// <inheritdoc />
    public partial class Migratios30 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProdutoId",
                table: "Usuarios",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_ProdutoId",
                table: "Usuarios",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Produtos_ProdutoId",
                table: "Usuarios",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Produtos_ProdutoId",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_ProdutoId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "ProdutoId",
                table: "Usuarios");
        }
    }
}
