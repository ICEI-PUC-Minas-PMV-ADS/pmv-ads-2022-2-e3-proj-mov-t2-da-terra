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
    [HttpPost(template: "login")]
    public async Task<IActionResult> PostLogin(
        [FromServices] AppDbContext context,
        [FromBody] CreateLoginViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var usuario = await context.Usuarios
      .FirstOrDefaultAsync(x => x.Email == model.Email);

      if (usuario == null)
        return NotFound(new { message = "Email não cadastrado" });

      try
      {
        if (usuario.Senha != model.Senha)
        {
          return BadRequest(new { message = "Senha Inválida" });
        }
        return Created($"v1/produtos/{usuario.Id}", usuario.Id);
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System.Exception" });
      }
    }
  }
}

