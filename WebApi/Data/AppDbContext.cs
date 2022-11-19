using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using System;
using System.Linq;
// using System.Data.Entity;

namespace WebApi.Data
{
  public class AppDbContext : DbContext
  {
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produtor> Produtores { get; set; }
    // public DbSet<ItemPedido> ItemPedidos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite(connectionString: "DataSource=daterra.db;Cache=Shared");
    }


  }
}