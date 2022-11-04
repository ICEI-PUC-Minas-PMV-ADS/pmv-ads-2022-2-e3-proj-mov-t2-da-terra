using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clientes_Usuarios_Id",
                table: "Clientes");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtor_Usuarios_Id",
                table: "Produtor");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Produtor_ProdutorId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_ProdutorId",
                table: "Produtos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Produtor",
                table: "Produtor");

            migrationBuilder.DropColumn(
                name: "ProdutorId",
                table: "Produtos");

            migrationBuilder.RenameTable(
                name: "Produtor",
                newName: "Produtores");

            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cep",
                table: "Clientes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cpf",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataCadastro",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataNascimento",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomeLoja",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumeroCasa",
                table: "Clientes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Rua",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Senha",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Uf",
                table: "Clientes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cep",
                table: "Produtores",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cpf",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataCadastro",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataNascimento",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumeroCasa",
                table: "Produtores",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Rua",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Senha",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Uf",
                table: "Produtores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produtores",
                table: "Produtores",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Produtores",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Cpf",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "DataNascimento",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "NomeLoja",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "NumeroCasa",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Rua",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Senha",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Uf",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Cpf",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "DataCadastro",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "DataNascimento",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Nome",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "NumeroCasa",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Rua",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Senha",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Produtores");

            migrationBuilder.DropColumn(
                name: "Uf",
                table: "Produtores");

            migrationBuilder.RenameTable(
                name: "Produtores",
                newName: "Produtor");

            migrationBuilder.AddColumn<int>(
                name: "ProdutorId",
                table: "Produtos",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Produtor",
                table: "Produtor",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_ProdutorId",
                table: "Produtos",
                column: "ProdutorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clientes_Usuarios_Id",
                table: "Clientes",
                column: "Id",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produtor_Usuarios_Id",
                table: "Produtor",
                column: "Id",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Produtor_ProdutorId",
                table: "Produtos",
                column: "ProdutorId",
                principalTable: "Produtor",
                principalColumn: "Id");
        }
    }
}
