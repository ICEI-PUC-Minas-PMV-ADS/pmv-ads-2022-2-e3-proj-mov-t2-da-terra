using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models;

public class Produto
{
  public Produto(Produto produto)
  {
    this.Id = produto.Id;
    this.ProdutorId = produto.ProdutorId;
    this.Nome = produto.Nome;
    this.Preco = produto.Preco;
    this.Embalagem = produto.Embalagem;
    this.Estoque = produto.Estoque;
    this.Categoria = produto.Categoria;
    this.Descricao = produto.Descricao;
    this.DataCadastro = produto.Categoria;
  }

  public Produto()
  {    
  }

  [Key]
  public int Id { get; set; }
  public int ProdutorId { get; set; }
  [ForeignKey("ProdutorId")]
  public Produtor Produtor { get; set; }

  public string Nome { get; set; }
  public decimal Preco { get; set; }
  public string Embalagem { get; set; }
  public float Estoque { get; set; }
  public string Categoria { get; set; }
  public string Descricao { get; set; }
  public string DataCadastro { get; set; }
  public ICollection<Produto> Produtos;

}