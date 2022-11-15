using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using WebApi.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ProdutosController : ControllerBase
  {

    // GET 
    // TERMINAR ESSE GET
    // Implementar o get para pegar somente do usuário logado  para exibir na LOJA do produtor
    // [HttpGet(template: "produtos")]
    // public async Task<IActionResult> GetProdutoAsync(
    //     [FromServices] AppDbContext context
    //     )
    // {
    //   var produto = await context.Produtos.ToListAsync();

    //   // var produtor = await context.Produtores
    //   // .FirstOrDefaultAsync(x => x.Nome == User.Identity.Name);

    //   // // Produtos associados aos seus respectivos produtores
    //   // var queryProduto = from query in
    //   //      context.Produtos.Include(a => a.Produtor)
    //   //                    select query;

    //   return produto == null
    //   ? NotFound(new { message = "Produto não encontrado" })
    //   : Ok(produto);
    // }

    // GET: Para todos os produtos: Tela Busca do Cliente, foi mantido separado por questão de erros
    [HttpGet(template: "produtos/carrinho/{id}")]

    public async Task<IActionResult> BuscaProduto(
        [FromServices] AppDbContext context,
        [FromRoute]int id
        )
    {
      var produto = await context.Produtos
        .FirstOrDefaultAsync(x => x.Id == id);

      return produto == null
      ? NotFound(new { message = "Produto não encontrado" })
      : Ok(produto);
    }

    // GET BUSCA DE PRODUTOS: CLIENTE    
    [HttpGet(template: "produtos/busca/")]
     public async Task<IActionResult> BuscaAsync(
      [FromServices] AppDbContext context,
      [FromQuery] string nomeProduto, string categoria)
    {
      // Ajustar essa query para não pegar todos dados do produtor e sim somente o ID
      var queryProduto = from query in context.Produtos
                           //.Include(x => x.Produtor)
                         select query;
  
      if (!String.IsNullOrEmpty(nomeProduto))  // nomeProduto true
      {
        if (!String.IsNullOrEmpty(categoria))       // categoria true
        {
          queryProduto = queryProduto.Where(
          x => x.Nome.Contains(nomeProduto)
          && x.Categoria.Contains(categoria));
        }
        else                                        // categoria false
        {
          queryProduto = queryProduto.Where(x => x.Nome.Contains(nomeProduto));
        }
        return queryProduto != null
               ? Ok(await queryProduto.ToListAsync())
               : NotFound(new { message = "Produto não encontrado." });
      }
      else                          // nomeProduto false - categoria true
      {
        queryProduto = queryProduto.Where(x => x.Categoria.Contains(categoria));
        return queryProduto != null
                     ? Ok(await queryProduto.ToListAsync())
                     : NotFound(new { message = "Produto não encontrado." });
      }
    }

    // POST OK
    [HttpPost(template: "produtos")]
    //[Authorize] // Authorize no react dar Json Error EOF
    public async Task<IActionResult> PostProdutoAsync(
      [FromServices] AppDbContext context,
      [FromBody] CreateProdutoViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      var produtor = context.Produtores
      .FirstOrDefaultAsync(x => x.Nome == User.Identity.Name);

      var produto = new Produto()
      {
        Nome = model.Nome,
        Preco = model.Preco,
        Embalagem = model.Embalagem,
        Estoque = model.Estoque,
        Categoria = model.Categoria,
        Descricao = model.Descricao,
        ProdutorId = produtor.Id,
        DataCadastro = model.DataCadastro
      };

      try
      {
        await context.AddAsync(produto);
        await context.SaveChangesAsync();

        return Created($"v1/produtos/{produto.Id}", produto);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }


    // PUT OK
    [HttpPut(template: "produtos/{id}")]
    //[Authorize]
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

        context.Produtos.Update(produto);
        await context.SaveChangesAsync();

        return Ok(produto);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }

    // DELETE OK
    [HttpDelete(template: "produtos/{id}")]
    //[Authorize]
    public async Task<IActionResult> DeleteProdutoAsync(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      var produto = await context.Produtos.FindAsync(id);

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
