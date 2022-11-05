using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class v12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Usuarios_UsuarioId",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Produtos",
                newName: "ProdutorId");

            migrationBuilder.RenameIndex(
                name: "IX_Produtos_UsuarioId",
                table: "Produtos",
                newName: "IX_Produtos_ProdutorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Produtores_ProdutorId",
                table: "Produtos",
                column: "ProdutorId",
                principalTable: "Produtores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Produtores_ProdutorId",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "ProdutorId",
                table: "Produtos",
                newName: "UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Produtos_ProdutorId",
                table: "Produtos",
                newName: "IX_Produtos_UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Usuarios_UsuarioId",
                table: "Produtos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
