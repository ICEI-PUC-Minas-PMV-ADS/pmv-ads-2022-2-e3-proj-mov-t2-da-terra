using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Models;

public class Pedido
{
    [Key]
    public int Id { get; set; }
    public int ProdutorId { get; set; }
    [ForeignKey("ProdutorId")]//Seria o ID do Vendedor no caso
    public Usuario Produtor;
    public int ClienteId { get; set; }
    [ForeignKey("ClienteId")]//Seria o ID do Vendedor no caso
    public Cliente Cliente;
    
    public string DataPedido { get; set; }
    public int QuantidadeProduto { get; set; }
    public decimal PrecoTotal  { get; set; }
    public string Status { get; set; }
  
}