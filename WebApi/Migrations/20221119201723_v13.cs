using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class v13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropColumn(
                name: "TipoUsuarioFK",
                table: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Pedidos",
                newName: "ProdutorId");

            migrationBuilder.RenameColumn(
                name: "QuantidadeProduto",
                table: "Pedidos",
                newName: "ClienteId");

            migrationBuilder.RenameColumn(
                name: "PrecoProduto",
                table: "Pedidos",
                newName: "PrecoTotalPedido");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProdutorId",
                table: "Pedidos",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "PrecoTotalPedido",
                table: "Pedidos",
                newName: "PrecoProduto");

            migrationBuilder.RenameColumn(
                name: "ClienteId",
                table: "Pedidos",
                newName: "QuantidadeProduto");

            migrationBuilder.AddColumn<string>(
                name: "TipoUsuarioFK",
                table: "Pedidos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Bairro = table.Column<string>(type: "TEXT", nullable: true),
                    Cep = table.Column<int>(type: "INTEGER", nullable: false),
                    Cidade = table.Column<string>(type: "TEXT", nullable: true),
                    Complemento = table.Column<string>(type: "TEXT", nullable: true),
                    Cpf = table.Column<string>(type: "TEXT", nullable: true),
                    DataCadastro = table.Column<string>(type: "TEXT", nullable: true),
                    DataNascimento = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    NomeLoja = table.Column<string>(type: "TEXT", nullable: true),
                    NumeroCasa = table.Column<int>(type: "INTEGER", nullable: false),
                    Rua = table.Column<string>(type: "TEXT", nullable: true),
                    Senha = table.Column<string>(type: "TEXT", nullable: true),
                    Telefone = table.Column<string>(type: "TEXT", nullable: true),
                    TipoUsuario = table.Column<string>(type: "TEXT", nullable: true),
                    Uf = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });
        }
    }
}
