using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models;

namespace WebApi.ViewModel;

public class CreatePedidoViewModel
{
  [Required]
  public int Id { get; set; }

  [Required]
  public int ClienteId { get; set; }
  [ForeignKey("ClienteId")]
  public Cliente Cliente;

  [Required]
  public int ProdutorId { get; set; }
  [ForeignKey("ProdutorId")]
  public Produtor Produtor;

  [Required]
  public int ProdutoId { get; set; }
  [ForeignKey("ProdutoId")]
  public Produto Produto;

  [Required]
  public decimal PrecoTotalPedido { get; set; }
  public string Status { get; set; }
  public string DataPedido { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm");

}