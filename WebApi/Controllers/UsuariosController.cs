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

    // GET : Por ID e filtrando se é cliente ou produtor
    [HttpGet(template: "usuarios/{id}")]
    public async Task<IActionResult> GetUsuarios(
        [FromServices] AppDbContext context, int id)
    {   
      
      var usuario = await context.Usuarios
        .FirstOrDefaultAsync(x => x.Id == id);

      if (usuario == null)
        return NotFound(new { message = "Usuário não encontrado" });

      try
      {
        if (usuario.NomeLoja == null) // Cliente
        {
          return Ok(usuario);
        }
        else  // Produtor
        {
          return Ok(usuario);
        }
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System Exception" });
      }
    }

    // GET: Todos usuários
    [HttpGet(template: "usuarios")]
    public async Task<ActionResult<IEnumerable<Usuario>>> GetAllUsuarios()
    {
      return await _context.Usuarios.ToListAsync();
    }

    // // GET: api/Usuarios/5

    // [HttpGet(template: "usuarios/{id}")]

    // /*Para tentar "Simplificar", a ideia é deixar 1 Método  genérico somente de getUsuario e dentro dele os metodos
    //  secundarios para buscar se é cliente ou usuario

    //  */
    //  public async Task<ActionResult<Cliente>> GetUsuario(int id)
    // {
    //   var cliente = GetCliente(id);
    //   var produtor = GetProdutor(id);

    //   if (cliente == null && produtor == null)
    //   {
    //     return NotFound();

    //   }
    //   else
    //   //Estudar com retornar  um ou outro,pois o ActionResult permite So um Tipo
    //   {
    //     if (cliente != null)
    //     {

    //       // return cliente;
    //     }
    //     else
    //     {
    //       // return produtor;
    //     }

    //   }

    //   return NotFound();

    // }
    // [HttpGet(template: "usuarios/{id}")]
    // public async Task<ActionResult<Cliente>> GetCliente(int id)//Método "secundário" para ser chamado no getUsuario
    // {

    //   var cliente = await _context.Clientes.FindAsync(id);//Se achar,retorna o objeto,se não retorna null

    //   if (cliente == null)//V
    //   {
    //     return null;//Ao inves de retornar NotFound,retorna o tipo null,ficando mais fácil de trabalhar no metodo getUsuario
    //   }
    //   else
    //   {
    //       return cliente;
    //   }


    // }
    // //GET PARA BUSCAR O NO BANCO O ID NA TABELA PRODUTOR

    // [HttpGet(template: "usuarios/{id}")]
    // public async Task<ActionResult<Produtor>> GetProdutor(int id)//Método "secundário" para ser chamado no getUsuario
    // {
    //   var produtor = await _context.Produtores.FindAsync(id);//Se achar,retorna o objeto,se não retorna null

    //   if (produtor == null)//Ao inves de retornar NotFound,retorna o tipo null,ficando mais fácil de trabalhar no metodo getUsuario
    //   {
    //     return null;
    //   }
    //   else
    //   {

    //       return produtor;
    //   }


    // }


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

      try
      {
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
          Senha = JsonSerializer.Serialize(
            BCrypt.Net.BCrypt.HashPassword(model.Senha)),
          TipoUsuario = model.TipoUsuario,
          DataCadastro = model.DataCadastro,
        };

        await context.AddAsync(usuario);
        await context.SaveChangesAsync();

        return Created($"v1/usuarios/{usuario.Id}", usuario);
      }
      catch
      {
        return BadRequest();
      }
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
        usuario.Senha = JsonSerializer.Serialize(
          BCrypt.Net.BCrypt.HashPassword(model.Senha));
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

