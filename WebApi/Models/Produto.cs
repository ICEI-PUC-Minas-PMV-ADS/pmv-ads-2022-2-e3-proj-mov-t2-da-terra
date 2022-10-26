namespace WebApi.Models;

public class Produto
{
  public int Id { get; set; }
  public string Nome { get; set; }
  public decimal Preco { get; set; }
  public string Embalagem { get; set; }
  public float Estoque { get; set; }
  public string Categoria { get; set; }
  public string Descricao { get; set; }  
  public string DataCadastro { get; set; }
}