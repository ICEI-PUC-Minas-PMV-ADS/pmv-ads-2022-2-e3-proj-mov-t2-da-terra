using System.ComponentModel.DataAnnotations;

namespace WebApi.ViewModel
{
  public class CreateProdutoViewModel
  {
    [Required]
    public string Nome { get; set; }
    [Required]
    public decimal Preco { get; set; }
    [Required]
    public string Embalagem { get; set; }
    [Required]
    public float Estoque { get; set; }
    [Required]
    public string Categoria { get; set; }
    [Required]
    public string Descricao { get; set; }
    // [Required]
    public string DataCadastro { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm");    
  }
}