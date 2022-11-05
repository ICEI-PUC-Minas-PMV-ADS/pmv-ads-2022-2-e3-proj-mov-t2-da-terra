using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class LoginController : ControllerBase
  {

    // [HttpGet(template: "login/{id}")]
    // public async Task<IActionResult> GetLogin(
    //   [FromServices] AppDbContext context,
    //   [FromRoute] int id)
    // {
    //   var usuario = await context.Usuarios
    //   .AsNoTracking()
    //   .FirstOrDefaultAsync(x => x.Id == id);

    //   string usuarioJson = JsonSerializer.Serialize(usuario);

    //   return usuario == null ? NotFound() : Ok(usuarioJson);

    // }

    [HttpPost(template: "login")]
    public async Task<IActionResult> PostLogin(
        [FromServices] AppDbContext context,
        [FromBody] CreateLoginViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      var produtor = await context.Produtores
      .FirstOrDefaultAsync(x => x.Email == model.Email);

      var cliente = await context.Clientes
      .FirstOrDefaultAsync(x => x.Email == model.Email);

      // SENHA RETORNANDO INVÁLIDA - VERIFICAR
      try
      {
        if (produtor != null)
        {
          if (produtor.Senha != model.Senha)
          {
            return BadRequest(new { message = "Senha Inválida (Produtor)" });
          }
          // Em testes, depois tirar Create e colocar OK
          return Created($"v1/login/{produtor.Id}", produtor.Id);
        }
        else if (cliente != null)
        {
          if (cliente.Senha != model.Senha)
          {
            return BadRequest(new { message = "Senha Inválida (Cliente)" });
          }
          // Em testes, depois tirar Create e colocar OK
          return Created($"v1/login/{cliente.Id}", cliente.Id);
        }
        else
        {
          return NotFound(new { message = "Email não cadastrado" });
        }
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System.Exception" });
      }
    }
  }
}

