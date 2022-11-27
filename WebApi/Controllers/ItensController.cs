using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpGet(template: "produtor/pedidos/itens/{id}")]
    public async Task<IActionResult> GetProdutoPedido(
         [FromServices] AppDbContext context,
         [FromRoute] int id)
    {
      List<Produto> produto = new List<Produto>();

      var queryItens = from query in context.Itens
                       select query;

      queryItens = queryItens.Where(item => item.PedidoId == id);

      try
      {
        foreach (var item in queryItens)
        {
          if (item != null)
          {
            var produtoBusca = await context.Produtos
            .FirstOrDefaultAsync(x => x.Id == item.ProdutoId);

            produto.Add(produtoBusca);
          }
        }
      }
      catch (System.Exception)
      {
        NotFound(new { message = "System.Exception" });
      }
      //string jsonString = JsonSerializer.Serialize(produto);     

      return produto == null
        ? NotFound(new { message = "Produto não encontrado" })
        : Ok(produto);
    }
  }
}