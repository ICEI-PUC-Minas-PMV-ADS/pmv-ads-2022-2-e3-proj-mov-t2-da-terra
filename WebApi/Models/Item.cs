using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
  public class Item
  {
    public int Id { get; set; }

    public int ProdutoId { get; set; }
    [ForeignKey("ProdutoId")]
    public Produto Produto;

    public int PedidoId { get; set; }
    [ForeignKey("PedidoId")]
    public Pedido Pedido;
    public float QuantidadeProduto { get; set; }
  }
}