using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using BCrypt.Net;
using WebApi.ViewModel;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ClientesController : ControllerBase
  {
    // GET: Todos produtores
    // OCULTAR APÓS TESTES
    [HttpGet(template: "clientes")]
    public async Task<IActionResult> GetAllCliente(
      [FromServices] AppDbContext context)
    {
      var cliente = await context.Clientes.ToListAsync();
      return Ok(cliente);
    }

    // GET : Por ID
    [HttpGet(template: "clientes/{id}")]
    //[Authorize(Roles = "cliente")]
    public async Task<IActionResult> GetCliente(
        [FromServices] AppDbContext context,
        [FromRoute] int id)
    {
      // Usuário tem acesso somente aos próprios dados
      var cliente = await context.Clientes
        .FirstOrDefaultAsync(x => x.Id == id && x.Nome == User.Identity.Name);

      if (cliente == null)
        return NotFound(new { message = "Cliente não encontrado" });

      try
      {
        cliente.Senha = "";
        return Ok(cliente);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // POST       
    [HttpPost(template: "clientes")]
    [AllowAnonymous]
    public async Task<IActionResult> PostCliente(
        [FromServices] AppDbContext context,
        [FromBody] CreateClienteViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      try
      {
        var cliente = new Cliente()
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
          Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha),
          TipoUsuario = model.TipoUsuario,
          DataCadastro = model.DataCadastro,
        };

        await context.AddAsync(cliente);
        await context.SaveChangesAsync();

        cliente.Senha = "";

        return Created($"v1/clientes/{cliente.Id}", cliente);
      }
      catch
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // PUT
    [HttpPut(template: "clientes/{id}")]
    [Authorize]
    public async Task<IActionResult> PutCliente(
            [FromServices] AppDbContext context,
            [FromBody] CreateClienteViewModel model,
            [FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      var cliente = await context.Clientes
          .FirstOrDefaultAsync(x => x.Id == id && x.Nome == User.Identity.Name);

      if (cliente == null)
        return NotFound(new { message = "Cliente não encontrado" });

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
        cliente.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);
        cliente.TipoUsuario = model.TipoUsuario;
        cliente.DataCadastro = model.DataCadastro;

        context.Clientes.Update(cliente);
        await context.SaveChangesAsync();

        cliente.Senha = "";

        return Ok(cliente);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // DELETE: api/Usuarios/5    
    [HttpDelete(template: "clientes/{id}")]
    [Authorize]
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
        return BadRequest(new { message = "System Exception" });
      }
    }
  }
}


/*  // User Logado
        var clienteLogado = await context.Clientes
          .FirstOrDefaultAsync(x => x.Nome == User.Identity.Name);
        cliente.Senha = "";

        return Ok(clienteLogado.Id);
        */

/*    public async Task<IActionResult> Logout()
{
    await HttpContext.SignOutAsync();
    return RedirectToAction("Index", "Home");
}*/