using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Embalagem",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Estoque",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Preco",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "NomeProduto",
                table: "Produtos",
                newName: "Nome");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Produtos",
                newName: "NomeProduto");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Produtos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Produtos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Embalagem",
                table: "Produtos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Estoque",
                table: "Produtos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Preco",
                table: "Produtos",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
