using Newtonsoft.Json;
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
    private readonly AppDbContext _context;

    public ProdutosController(AppDbContext context)
    {
      _context = context;
    }
    

    // GET 
    /*
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
    */

    
    
    
    // GET 
    [HttpGet(template: "produtos")]
    public async Task<IActionResult> BuscaAsync(string nomeProduto, decimal precoMax, string categoria)
    {
      var queryProduto =  from query in
          _context.Produtos.Include(a => a.Produtos)
        select query;
      //Caso todas os filtros estejam vazios,retorna não encontrado
      if (String.IsNullOrEmpty(nomeProduto) && precoMax == 0.0m && String.IsNullOrEmpty(categoria))
      {
        return NotFound(new { message = "Produto não encontrado" });

      }
     
        //Caso possua o Somente o nome do produto e não tiver
        if (!String.IsNullOrEmpty(nomeProduto) && precoMax == 0.0m && String.IsNullOrEmpty(categoria))
        {

          queryProduto =  queryProduto.Where(s =>  s.Nome.Contains(nomeProduto));
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();
          
           return produtosEncontrados!=null ? Ok(produtosEncontrados):NotFound();

        }
        //Se Não tiver nome nem categoria,mas tiver preçoMax
        else if (precoMax>0 && String.IsNullOrEmpty(nomeProduto) && String.IsNullOrEmpty(categoria))
        {
          
          queryProduto = queryProduto.Where(s =>s.Preco<=precoMax);
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();
          
          return produtosEncontrados!=null ? Ok(produtosEncontrados):NotFound();
          
          
        }
        //Se tiver categoria e não tiver preço maximo e nem nome do produto
        else if (!String.IsNullOrEmpty(categoria) && precoMax == 0.0m && String.IsNullOrEmpty(nomeProduto))
        {
          queryProduto = queryProduto.Where(s => s.Categoria.Contains(categoria));
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();

          return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
        }
        //Se tiver Nome e categoria e não tiver preço max
        else if (!String.IsNullOrEmpty(nomeProduto) && !String.IsNullOrEmpty(categoria) && precoMax==0.0m)
        {
          queryProduto = queryProduto.Where(s => s.Nome.Contains(nomeProduto) && 
                                                 s.Categoria.Contains(categoria) );
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();

          return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
          
        }
        //Se tiver nome Produto e preço maximo e não tiver categoria
        else if (!String.IsNullOrEmpty(nomeProduto) && precoMax > 0.0m && String.IsNullOrEmpty(categoria))
        {
          
          queryProduto = queryProduto.Where(s => s.Nome.Contains(nomeProduto)
          && s.Preco<=precoMax);
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();
          
          return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
          
        }
        //Se tiver Categoria e preço max e não tiver Nome do produto
        else if (precoMax > 0.0m && !String.IsNullOrEmpty(categoria) && String.IsNullOrEmpty(nomeProduto))
        {
          queryProduto = queryProduto.Where(s => s.Categoria.Contains(categoria)
                                                 && s.Preco<=precoMax);
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();
          
          return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
          
          
          
        }
        //Tendo todos os filtros,Nome produto categoria e Preço máximo
        else if (!String.IsNullOrEmpty(nomeProduto) && precoMax > 0.0m && !String.IsNullOrEmpty(categoria))
        {
          queryProduto = queryProduto.Where(s => s.Nome.Contains(nomeProduto)
                                                 && s.Categoria.Contains(categoria) 
                                                 && s.Preco <= precoMax);
          
          //Converte para um Lista do tipo de produtos para ser possivel retornar
          var produtosEncontrados = await queryProduto.ToListAsync();
          
          return produtosEncontrados != null ? Ok(produtosEncontrados) : NotFound();
          
          
        }
      
      return BadRequest();
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
        ProdutorId = model.ProdutorId,
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