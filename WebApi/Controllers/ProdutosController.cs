using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ProdutosController : ControllerBase
  {

    // GET 
    [HttpGet(template: "produtos/{id}")]
    public async Task<IActionResult> GetProdutoAsync(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      var produto = await context.Produtos
      .AsNoTracking()
      .FirstOrDefaultAsync(x => x.Id == id);

      string produtoJson = JsonSerializer.Serialize(produto);

      return produto == null ? NotFound() : Ok(produtoJson);
    }

     // GET 
    [HttpGet(template: "produtos")]
    public async Task<IActionResult> GetAllProdutoAsync(
        [FromServices] AppDbContext context)
    {
      var produto = await context.Produtos.ToListAsync();

     // string produtoJson = JsonSerializer.Serialize(produto);

      return produto == null ? NotFound() : Ok(produto);
    }

    // POST
    [HttpPost(template: "produtos")]
    public async Task<IActionResult> PostProdutoAsync(
      [FromServices] AppDbContext context,
      [FromBody] CreateProdutoViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var produto = new Produto()
      {
        Nome = model.Nome,
        Preco = model.Preco,
        Embalagem = model.Embalagem,
        Estoque = model.Estoque,
        Categoria = model.Categoria,
        Descricao = model.Descricao,
        DataCadastro = model.DataCadastro
      };

      try
      {
        // aqui context.AddAsync(produto);
        await context.AddAsync(produto);
        await context.SaveChangesAsync();

        return Created($"v1/produtos/{produto.Id}", produto);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }


    // PUT
    [HttpPut(template: "produtos/{id}")]
    public async Task<IActionResult> PutPessoaAsync(
            [FromServices] AppDbContext context,
            [FromBody] CreateProdutoViewModel model,
            [FromRoute] int id)
    {
      if (!ModelState.IsValid) return BadRequest();

      var produto = await context.Produtos
      .FirstOrDefaultAsync(x => x.Id == id);

      if (produto == null)
        return NotFound();

      try
      {
        produto.Nome = model.Nome;
        produto.Preco = model.Preco;
        produto.Embalagem = model.Embalagem;
        produto.Estoque = model.Estoque;
        produto.Categoria = model.Categoria;
        produto.Descricao = model.Descricao;
        // produto.DataCadastro = model.DataCadastro;

        context.Produtos.Update(produto);
        await context.SaveChangesAsync();

        return Ok(produto);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }

    // DELETE
    [HttpDelete(template: "produtos/{id}")]
    public async Task<IActionResult> DeleteProdutoAsync(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      var produto = await context.Produtos
      .FirstOrDefaultAsync(x => x.Id == id);

      try
      {
        context.Produtos.Remove(produto);
        await context.SaveChangesAsync();

        return Ok();
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }
  }





}