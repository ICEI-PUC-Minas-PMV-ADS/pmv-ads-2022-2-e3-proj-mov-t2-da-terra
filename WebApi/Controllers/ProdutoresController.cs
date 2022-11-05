using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using BCrypt.Net;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ProdutoresController : ControllerBase
  {

    // GET: Todos
    [HttpGet(template: "produtores")]
    public async Task<IActionResult> GetAllProdutores(
        [FromServices] AppDbContext context)
    {
      var produtor = await context.Produtores.ToListAsync();
      
      return Ok(produtor);
    }

    // GET: Por ID
    [HttpGet(template: "produtores/{id}")]
    public async Task<IActionResult> GetProdutores(
      [FromServices] AppDbContext context,
      [FromRoute] int id)
    {
      var produtor = await context.Produtores
      .AsNoTracking()
      .FirstOrDefaultAsync(x => x.Id == id);

      if (produtor == null)
        return NotFound(new { message = "Produtor não encontrado" });

      try
      {
        return Ok(produtor);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // POST
    [HttpPost(template: "produtores")]
    public async Task<IActionResult> PostProdutores(
      [FromServices] AppDbContext context,
      [FromBody] CreateProdutorViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      try
      {
        var produtor = new Produtor()
        {
          Nome = model.Nome,
          DataNascimento = model.DataNascimento,
          Cpf = model.Cpf,
          Telefone = model.Telefone,
          Rua = model.Rua,
          Bairro = model.Bairro,
          NumeroCasa = model.NumeroCasa,
          Cep = model.Cep,
          Cidade = model.Cidade,
          Uf = model.Uf,
          Complemento = model.Complemento,
          Email = model.Email,
          Senha = JsonSerializer.Serialize(
            BCrypt.Net.BCrypt.HashPassword(model.Senha)),
          TipoUsuario = model.TipoUsuario,
          NomeLoja = model.NomeLoja,
          DataCadastro = model.DataCadastro
        };

        await context.AddAsync(produtor);
        await context.SaveChangesAsync();

        return Created($"v1/produtores/{produtor.Id}", produtor);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // PUT
    [HttpPut(template: "produtores/{id}")]
    public async Task<IActionResult> PutProdutores(
          [FromServices] AppDbContext context,
          [FromBody] CreateProdutorViewModel model,
          [FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      var produtor = await context.Produtores
      .FirstOrDefaultAsync(x => x.Id == id);

      if (produtor == null)
        return NotFound(new { message = "Produtor não encontrado" });

      try
      {
        produtor.Nome = model.Nome;
        produtor.DataNascimento = model.DataNascimento;
        produtor.Cpf = model.Cpf;
        produtor.Telefone = model.Telefone;
        produtor.Rua = model.Rua;
        produtor.Bairro = model.Bairro;
        produtor.NumeroCasa = model.NumeroCasa;
        produtor.Cep = model.Cep;
        produtor.Cidade = model.Cidade;
        produtor.Uf = model.Uf;
        produtor.Complemento = model.Complemento;
        produtor.Email = model.Email;
        produtor.Senha = JsonSerializer.Serialize(
            BCrypt.Net.BCrypt.HashPassword(model.Senha));
        produtor.TipoUsuario = model.TipoUsuario;
        produtor.NomeLoja = model.NomeLoja;
        produtor.DataCadastro = model.DataCadastro;

        context.Produtores.Update(produtor);
        await context.SaveChangesAsync();

        return Ok(produtor);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // DELETE
    [HttpDelete(template: "produtores/{id}")]
    public async Task<IActionResult> DeleteProdutores(
      [FromServices] AppDbContext context,
      [FromRoute] int id)
    { 
      var produtor = await context.Produtores
      .FirstOrDefaultAsync(x => x.Id == id);

      if (produtor == null)
        return NotFound(new { message = "Produtor não encontrado" });

      try
      {
        context.Produtores.Remove(produtor);
        await context.SaveChangesAsync();
        return Ok(new { message = "Produtor excluído" });
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }
  }
}