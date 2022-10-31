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

    // PUT: api/Usuarios/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut(template: "usuarios/{id}")]
    public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
    {
      if (id != usuario.Id)
      {
        return BadRequest();
      }

      _context.Entry(usuario).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!UsuarioExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }
      return NoContent();
    }

    // POST: api/Usuarios
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

