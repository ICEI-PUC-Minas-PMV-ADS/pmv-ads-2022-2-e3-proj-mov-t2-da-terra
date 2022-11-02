using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Models;

public class Pedido
{
    [Key]
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    [ForeignKey("UsuarioId")]//Seria o ID do Vendedor no caso
    public Usuario Usuario;
    public string TipoUsuarioFK { get; set; }
    [ForeignKey("TipoUsuarioFK")]

    public string DataPedido { get; set; }
    public int QuantidadeProduto { get; set; }
    public decimal PrecoProduto { get; set; }
    public string Status { get; set; }
  
}