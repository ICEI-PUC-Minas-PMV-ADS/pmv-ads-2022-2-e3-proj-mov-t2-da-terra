using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.ViewModel;
namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class PedidosController : ControllerBase
  {
    [HttpPost(template: "pedidos")]
    public async Task<IActionResult> PostEnviarPedido(
        [FromServices] AppDbContext context,
        [FromBody] CreatePedidoViewModel model)
    {
      if (!ModelState.IsValid) return BadRequest("Model Inválido");

      try
      {
        var pedido = new Pedido()
        {
          ClienteId = model.ClienteId,
          ProdutorId = model.ProdutorId,        
          PrecoTotalPedido = model.PrecoTotalPedido,
          Status = model.Status,
          DataPedido = model.DataPedido
        };

        await context.AddAsync(pedido);
        await context.SaveChangesAsync();
       
        return Created($"v1/pedidos/{pedido.Id}", pedido);
      }
      catch (System.Exception)
      {
        return BadRequest("System.Exception");
      }
    }

    [HttpGet(template: "pedidos/{id}")]
    public async Task<IActionResult> GetPedido(
      [FromServices] AppDbContext context,
      [FromRoute] int id)
    {
      var pedido = await context.Pedidos
        .FirstOrDefaultAsync(x => x.ClienteId == id);
      
        

      return pedido == null ? BadRequest("Model Inválido") : Ok(pedido);
    }

    [HttpPut(template: "pedidos/{id}")]

    public async Task<IActionResult> PutPedido(
      [FromServices] AppDbContext context,
      [FromBody] CreatePedidoViewModel model,
      [FromRoute] int id)

    {
      if (!ModelState.IsValid) return BadRequest();
      
      var pedido = await context.Pedidos.FirstOrDefaultAsync(a => a.Id == id);

      if (pedido == null)
      {
        return NotFound();
      }

      try
      {
        pedido.ProdutorId = model.ProdutorId;
        pedido.ClienteId = model.ClienteId;
        pedido.PrecoTotalPedido = model.PrecoTotalPedido;
        pedido.DataPedido = model.DataPedido;
        pedido.Status = model.Status;//Mais importante

        context.Pedidos.Update(pedido);
        await context.SaveChangesAsync();

        return Ok(pedido);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
      
    }
      

    
  }
}

