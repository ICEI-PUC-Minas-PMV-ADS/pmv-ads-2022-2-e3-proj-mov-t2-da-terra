using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class users : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "TipoUsario",
                table: "Usuarios",
                newName: "TipoUsuario");

            migrationBuilder.AlterColumn<string>(
                name: "DataNascimento",
                table: "Usuarios",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Usuarios",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataCadastro",
                table: "Usuarios",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "Usuarios");

            migrationBuilder.RenameColumn(
                name: "TipoUsuario",
                table: "Usuarios",
                newName: "TipoUsario");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataNascimento",
                table: "Usuarios",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

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
    }
}
