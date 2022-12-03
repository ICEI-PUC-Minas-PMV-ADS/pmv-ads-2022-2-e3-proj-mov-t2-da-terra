using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
  public class AppDbContext : DbContext
  {
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produtor> Produtores { get; set; }
    public DbSet<Item> Itens { get; set; }
    public DbSet<Image> Image { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite(connectionString: "DataSource=daterra.db;Cache=Shared");
    }
  }
}