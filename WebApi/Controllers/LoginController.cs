using System.Text.Json;
using BCrypt.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class LoginController : ControllerBase
  {
    [AllowAnonymous]
    [HttpPost(template: "login")]
    public async Task<ActionResult<dynamic>> Login(
        [FromServices] AppDbContext context,
        [FromBody] CreateLoginViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Invalid" });

      var produtor = await context.Produtores
      .FirstOrDefaultAsync(x => x.Email == model.Email);

      var cliente = await context.Clientes
      .FirstOrDefaultAsync(x => x.Email == model.Email);


      if (produtor == null && cliente == null)
      {
        return NotFound(new { message = "Usuário não cadastrado" });
      }

      // Validação senha e geração TOKEN
      if (produtor != null)   // PRODUTOR
      {
        if (BCrypt.Net.BCrypt.Verify(model.Senha, produtor.Senha))
        {
          var token = TokenServices.GenerateToken(produtor, null);
          produtor.Senha = "";       // Ocultar Senha

          return new
          {
            produtor = produtor.TipoUsuario,
            token = token
          };
        }
      }
      else   // CLIENTE
      {
        if (BCrypt.Net.BCrypt.Verify(model.Senha, cliente.Senha))
        {
          var token = TokenServices.GenerateToken(null, cliente);
          cliente.Senha = "";

          return new
          {
            cliente = cliente.TipoUsuario,
            token = token
          };
        }
      }
      // Se nenhuma senha é correta, então BadRequest
      return BadRequest(new { message = "Senha Inválida" });
    }


    // Remover token para o LOGOUT - Em estudo
    // [HttpPost("logout")]
    // public async Task<IActionResult> Logout()
    // {
    //  // Response.Headers.Remove("Authorization");
    // //  return Ok();     
    //   return Ok(Response.Headers.Remove("Authorization")
    //     ? new { message = "Removido" } : new { message = "Não Removido" });
    // }
  }
}
