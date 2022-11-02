﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Data;

#nullable disable

namespace WebApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0-rc.2.22472.11");

            modelBuilder.Entity("WebApi.Models.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DataPedido")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("PrecoProduto")
                        .HasColumnType("TEXT");

                    b.Property<int>("QuantidadeProduto")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<string>("TipoUsuarioFK")
                        .HasColumnType("TEXT");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Pedidos");
                });

            modelBuilder.Entity("WebApi.Models.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Categoria")
                        .HasColumnType("TEXT");

                    b.Property<string>("DataCadastro")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Embalagem")
                        .HasColumnType("TEXT");

                    b.Property<float>("Estoque")
                        .HasColumnType("REAL");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Preco")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ProdutorId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ProdutorId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Produtos");
                });

            modelBuilder.Entity("WebApi.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Bairro")
                        .HasColumnType("TEXT");

                    b.Property<int>("Cep")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Cidade")
                        .HasColumnType("TEXT");

                    b.Property<string>("Complemento")
                        .HasColumnType("TEXT");

                    b.Property<string>("Cpf")
                        .HasColumnType("TEXT");

                    b.Property<string>("DataCadastro")
                        .HasColumnType("TEXT");

                    b.Property<string>("DataNascimento")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("NumeroCasa")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Rua")
                        .HasColumnType("TEXT");

                    b.Property<string>("Senha")
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefone")
                        .HasColumnType("TEXT");

                    b.Property<string>("TipoUsuario")
                        .HasColumnType("TEXT");

                    b.Property<string>("Uf")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("WebApi.Models.Cliente", b =>
                {
                    b.HasBaseType("WebApi.Models.Usuario");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("WebApi.Models.Produtor", b =>
                {
                    b.HasBaseType("WebApi.Models.Usuario");

                    b.Property<string>("NomeLoja")
                        .HasColumnType("TEXT");

                    b.ToTable("Produtor");
                });

            modelBuilder.Entity("WebApi.Models.Produto", b =>
                {
                    b.HasOne("WebApi.Models.Produtor", null)
                        .WithMany("Produtos")
                        .HasForeignKey("ProdutorId");

                    b.HasOne("WebApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("WebApi.Models.Cliente", b =>
                {
                    b.HasOne("WebApi.Models.Usuario", null)
                        .WithOne()
                        .HasForeignKey("WebApi.Models.Cliente", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Models.Produtor", b =>
                {
                    b.HasOne("WebApi.Models.Usuario", null)
                        .WithOne()
                        .HasForeignKey("WebApi.Models.Produtor", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Models.Produtor", b =>
                {
                    b.Navigation("Produtos");
                });
#pragma warning restore 612, 618
        }
    }
}
