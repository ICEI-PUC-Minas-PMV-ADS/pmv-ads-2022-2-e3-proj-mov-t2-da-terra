using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models;

public class Produto
{
  [Key]
  public int Id { get; set; }
  public int UsuarioId { get; set; }
  [ForeignKey("UsuarioId")]
  public Usuario Usuario { get; set; }
  
  public string Nome { get; set; }
  public decimal Preco { get; set; }
  public string Embalagem { get; set; }
  public float Estoque { get; set; }
  public string Categoria { get; set; }
  public string Descricao { get; set; }
  public string DataCadastro { get; set; }
}