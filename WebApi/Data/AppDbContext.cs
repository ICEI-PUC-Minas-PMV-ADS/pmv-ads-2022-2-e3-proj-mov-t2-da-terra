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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite(connectionString: "DataSource=daterra.db;Cache=Shared");
    }
      //Aqui criaria TCP(Table concret type),criando de fato as tabelas Cliente e Produtor,mas precisa do
      //DbModelBuilder,usando o namespace System.Data.Entity só que nao funciona) 
      // protected override void OnModelCreating(DbModelBuilder modelBuilder)
      // {
      //   modelBuilder.Entity<Cliente>().Map(m =>
      //   {
      //     m.MapInheritedProperties();
      //     m.ToTable("Clientes");
      //   });
      //
      //   modelBuilder.Entity<Produtor>().Map(m =>
      //   {
      //     m.MapInheritedProperties();
      //     m.ToTable("Produtores");
      //   });
      // }

  }
}