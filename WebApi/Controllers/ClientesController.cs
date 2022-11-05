using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
  public class ClientesController : ControllerBase
  {
    // GET: Todos produtores
    [HttpGet(template: "clientes")]
    public async Task<IActionResult> GetAllCliente(
      [FromServices] AppDbContext context)
    {
      var cliente = await context.Clientes.ToListAsync();
      return Ok(cliente);
    }

    // GET : Por ID
    [HttpGet(template: "clientes/{id}")]
    public async Task<IActionResult> GetCliente(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      var cliente = await context.Clientes
        .FirstOrDefaultAsync(x => x.Id == id);

      if (cliente == null)
        return NotFound(new { message = "Cliente não encontrado" });

      try
      {
        return Ok(cliente);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // POST   
    [HttpPost(template: "clientes")]
    public async Task<IActionResult> PostCliente(
        [FromServices] AppDbContext context,
        [FromBody] CreateClienteViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      try
      {
        var cliente = new Cliente()
        {
          //Ver como vai ficar o Produto e ProdutoId
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
          DataCadastro = model.DataCadastro,
        };

        await context.AddAsync(cliente);
        await context.SaveChangesAsync();

        return Created($"v1/clientes/{cliente.Id}", cliente);
      }
      catch
      {
        return BadRequest();
      }
    }

    // PUT
    [HttpPut(template: "clientes/{id}")]
    public async Task<IActionResult> PutCliente(
            [FromServices] AppDbContext context,
            [FromBody] CreateClienteViewModel model,
            [FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var cliente = await context.Clientes
      .FirstOrDefaultAsync(x => x.Id == id);

      if (cliente == null)
        return NotFound();

      try
      {
        cliente.Nome = model.Nome;
        cliente.DataNascimento = model.DataNascimento;
        cliente.Cpf = model.Cpf;
        cliente.Telefone = model.Telefone;
        cliente.Rua = model.Rua;
        cliente.Bairro = model.Bairro;
        cliente.NumeroCasa = model.NumeroCasa;
        cliente.Cep = model.Cep;
        cliente.Cidade = model.Cidade;
        cliente.Uf = model.Uf;
        cliente.Complemento = model.Complemento;
        cliente.Email = model.Email;
        cliente.Senha = JsonSerializer.Serialize(
          BCrypt.Net.BCrypt.HashPassword(model.Senha));
        cliente.TipoUsuario = model.TipoUsuario;
        cliente.DataCadastro = model.DataCadastro;

        context.Clientes.Update(cliente);
        await context.SaveChangesAsync();

        return Ok(cliente);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }

    // DELETE: api/Usuarios/5
    [HttpDelete(template: "clientes/{id}")]
    public async Task<IActionResult> DeleteCliente(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      var cliente = await context.Clientes.FindAsync(id);

      try
      {
        context.Clientes.Remove(cliente);
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
