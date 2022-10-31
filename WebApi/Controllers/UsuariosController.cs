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
  public class UsuariosController : ControllerBase
  {
    private readonly AppDbContext _context;

    public UsuariosController(AppDbContext context)
    {
      _context = context;
    }

    // GET: api/Usuarios
    [HttpGet(template: "usuarios")]
    public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
    {
      return await _context.Usuarios.ToListAsync();
    }

    // GET: api/Usuarios/5
    [HttpGet(template: "usuarios/{id}")]
    public async Task<ActionResult<Usuario>> GetUsuario(int id)
    {
      var usuario = await _context.Usuarios.FindAsync(id);

      if (usuario == null)
      {
        return NotFound();
      }
      return usuario;
    }

    // POST    
    [HttpPost(template: "usuarios")]
    public async Task<IActionResult> PostUsuarioAsync(
        [FromServices] AppDbContext context,
        [FromBody] CreateUsuarioViewModel model)
    {
      if (!ModelState.IsValid)
      {

        return BadRequest();
      }

      var usuario = new Usuario()
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
        Senha = JsonSerializer.Serialize(BCrypt.Net.BCrypt.HashPassword(model.Senha)),
        TipoUsuario = model.TipoUsuario,
        DataCadastro = model.DataCadastro,
      };

      try
      {
        await context.AddAsync(usuario);
        await context.SaveChangesAsync();

        return Created($"v1/usuarios/{usuario.Id}", usuario);
      }
      catch
      {
        return BadRequest();
      }
      //  usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
    }

    // PUT
    [HttpPut(template: "usuarios/{id}")]
    public async Task<IActionResult> PutUsuario(
            [FromServices] AppDbContext context,
            [FromBody] CreateUsuarioViewModel model,
            [FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var usuario = await context.Usuarios
      .FirstOrDefaultAsync(x => x.Id == id);

      if (usuario == null)
        return NotFound();

      try
      {   
        usuario.Nome = model.Nome;
        usuario.DataNascimento = model.DataNascimento;
        usuario.Cpf = model.Cpf;
        usuario.Telefone = model.Telefone;
        usuario.Rua = model.Rua;
        usuario.Bairro = model.Bairro;
        usuario.NumeroCasa = model.NumeroCasa;
        usuario.Cep = model.Cep;
        usuario.Cidade = model.Cidade;
        usuario.Uf = model.Uf;
        usuario.Complemento = model.Complemento;
        usuario.Email = model.Email;
        usuario.Senha = JsonSerializer.Serialize(BCrypt.Net.BCrypt.HashPassword(model.Senha));
        usuario.TipoUsuario = model.TipoUsuario;
        usuario.DataCadastro = model.DataCadastro;

        context.Usuarios.Update(usuario);
        await context.SaveChangesAsync();

        return Ok(usuario);
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }

    // DELETE: api/Usuarios/5
    [HttpDelete(template: "usuarios/{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
      var usuario = await _context.Usuarios.FindAsync(id);

      try
      {
        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();

        return Ok();
      }
      catch (System.Exception)
      {
        return BadRequest();
      }
    }

    private bool UsuarioExists(int id)
    {
      return _context.Usuarios.Any(e => e.Id == id);
    }
  }
}

