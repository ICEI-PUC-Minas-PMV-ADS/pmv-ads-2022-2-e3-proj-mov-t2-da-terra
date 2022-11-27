using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.ViewModel
{
  public class CreateItemModelView
  {
    public int Id { get; set; }

    [Required]
    public int ProdutoId { get; set; }
    [ForeignKey("ProdutoId")]
    public Produto Produto;

    [Required]
    public int PedidoId { get; set; }
    [ForeignKey("PedidoId")]
    public Pedido Pedido;
    [Required]
    public float QuantidadeProduto { get; set; }
  }
}