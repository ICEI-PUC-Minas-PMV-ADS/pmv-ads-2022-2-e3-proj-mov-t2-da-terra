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

    // GET CLIENTE: 
    // Esse GET serve para quando o CLIENTE abre o aplicativo 
    // e a na busca já renderiza os produtos
    [HttpGet(template: "produtos/todos")]
    public async Task<IActionResult> GetBuscaProdutoCliente(
        [FromServices] AppDbContext context)
    {
      var produto = await context.Produtos.ToListAsync();

      return produto == null
      ? NotFound(new { message = "Produto não encontrado" })
      : Ok(produto);
    }

    // GET 
    [HttpGet(template: "produtos/busca/{nomeProduto}")]
    public async Task<IActionResult> BuscaAsync(
      [FromServices] AppDbContext context,
      string nomeProduto)
    {
      var queryProduto = from query in
          context.Produtos select query;

      if (!String.IsNullOrEmpty(nomeProduto))
      {
        var prod = (IActionResult)await queryProduto.ToListAsync();
        return Ok(prod);
      }

      return NoContent();
    }


    // // GET 
    // [HttpGet(template: "produtos/all")]
    // public async Task<IActionResult> GetAllProdutoAsync(
    //   [FromServices] AppDbContext context)
    // {
    //   var produtor = await context.Produtores.FirstOrDefaultAsync(s => s.Nome == User.Identity.Name);
    //   //Acha os produtos de acordo com a Id do usuário logado,aonde pega a a chave FK na tabela Produtor
    //   var produtosFind = context.Produtos.Where(a => a.ProdutorId == produtor.Id);
    //   /*"Tranforma" o tipo IQueryaable acima, que é o retorno dos produtos achados de tal usuário logado,para uma lista
    //   De produtos a serem retornados*/
    //   var produtos = await produtosFind.ToListAsync();
    //   //Retorna os produtos achados para a API,para ser consumida na aplicação REACT
    //   return produtos == null ? NotFound() : Ok(produtos);
    // }

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


/*

    // GET 
    [HttpGet(template: "produtos/busca")]
    public async Task<IActionResult> BuscaAsync(
      [FromServices] AppDbContext context,
      string nomeProduto,
      string categoria)
    {
      var queryProduto = from query in
          context.Produtos.Include(a => a.Produtos)
                         select query;

      //Caso todas os filtros estejam vazios,retorna não encontrado
      if (String.IsNullOrEmpty(nomeProduto) && String.IsNullOrEmpty(categoria))
      {
        return NotFound(new { message = "Produto não encontrado" });

      }

      //Caso possua o Somente o nome do produto e não tiver categoria
      if (!String.IsNullOrEmpty(nomeProduto) && String.IsNullOrEmpty(categoria))
      {

        queryProduto = queryProduto.Where(s => s.Nome.Contains(nomeProduto));

        //Converte para um Lista do tipo de produtos para ser possivel retornar
        var produtosEncontrados = await queryProduto.ToListAsync();

        return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();

      }
      //Se Não tiver nome nem categoria,mas tiver preçoMax

      //Se tiver categoria e não tiver nome do produto
      else if (!String.IsNullOrEmpty(categoria) && String.IsNullOrEmpty(nomeProduto))
      {
        queryProduto = queryProduto.Where(s => s.Categoria.Contains(categoria));

        //Converte para um Lista do tipo de produtos para ser possivel retornar
        var produtosEncontrados = await queryProduto.ToListAsync();

        return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
      }
      //Se tiver Nome e categoria 
      else
      {
        queryProduto = queryProduto.Where(s => s.Nome.Contains(nomeProduto) &&
                                               s.Categoria.Contains(categoria));

        //Converte para um Lista do tipo de produtos para ser possivel retornar
        var produtosEncontrados = await queryProduto.ToListAsync();

        return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
       
      }
       return NoContent();
    }
*/