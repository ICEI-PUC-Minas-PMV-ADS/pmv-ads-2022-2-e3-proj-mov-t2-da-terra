using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ItensController : ControllerBase
  {
    [HttpPost(template: "pedidos/itens")]
    public async Task<IActionResult> PostItensPedido(
        [FromServices] AppDbContext context,
        [FromBody] CreateItemModelView model)
    {
      if (!ModelState.IsValid) return BadRequest("Model Inválido");

      try
      {
        var item = new Item()
        {
          ProdutoId = model.ProdutoId,
          PedidoId = model.PedidoId,
          QuantidadeProduto = model.QuantidadeProduto
        };

        await context.AddAsync(item);
        await context.SaveChangesAsync();

        return Created($"v1/pedidos/itens/{item.Id}", item);
      }
      catch (System.Exception)
      {
        return BadRequest("System.Exception");
      }
    }

    // [HttpGet(template: "pedidos/itens/{id}")]
    // public async Task<IActionResult> GetPedido(
    //   [FromServices] AppDbContext context,
    //   [FromRoute] int id)
    // {
    //   var pedido = await context.Pedidos
    //     .FirstOrDefaultAsync(x => x.Id == id);

    //   return pedido == null ? BadRequest("Model Inválido") : Ok(pedido);
    // }
  }
}