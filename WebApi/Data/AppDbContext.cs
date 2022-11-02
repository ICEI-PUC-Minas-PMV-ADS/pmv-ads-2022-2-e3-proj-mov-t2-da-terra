using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
  public class AppDbContext : DbContext
  {
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
  public DbSet<Pedido> Pedidos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite(connectionString: "DataSource=daterra.db;Cache=Shared");
    }
  }
}