using System.Text.Json;
using BCrypt.Net;
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
    // Token está gerando ok, retorna usuário ok. Problema no VERIFY

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

      // EM ANDAMENTO
      try
      {
        if (produtor != null) // Funcionando PARCIALMENTE
        {
          if (BCrypt.Net.BCrypt.Verify(model.Senha, produtor.Senha))
          {
            var token = TokenServices.GenerateToken(produtor, null);
            produtor.Senha = "";  // Ocultar Senha

            return new
            {
              produtor = produtor,
              token = token
            };
          }
        }
        else  // Funcionando PARCIALMENTE
        {
          if (BCrypt.Net.BCrypt.Verify(model.Senha, cliente.Senha))
          {
            var token = TokenServices.GenerateToken(null, cliente);
            cliente.Senha = ""; // Ocultar Senha

            return new
            {
              cliente = cliente,
              token = token
            };
          }
          else
          {
            BadRequest(new { message = "System Exception" });
          }
        }
      }
      catch (System.Exception)
      {
        BadRequest(new { message = "System Exception" });
      }
      return Ok();
    }
  }
}
