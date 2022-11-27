using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ValidaCadastroController : ControllerBase
  {
    [HttpGet(template: "validarcadastro/{email}")]
    public async Task<IActionResult> ValidarCadastro(
   [FromServices] AppDbContext context,
   [FromRoute] string email)
    {
      // if (!ModelState.IsValid)
      //   return BadRequest(new { message = "Model Invalid" });
      if (email == null)
        return BadRequest(new { message = "Model Invalid" });

      var produtor = await context.Produtores
      .FirstOrDefaultAsync(x => x.Email == email);

      var cliente = await context.Clientes
      .FirstOrDefaultAsync(x => x.Email == email);

      try
      {
        if (produtor != null)
        {
          return Ok(produtor.Id);
        }
        else if (cliente != null)
        {
          return Ok(cliente.Id);
        }
        else
        {
          return Ok(new { message = "Novo Usuário" });
        }
      }
      catch (System.Exception)
      {
        return BadRequest(new { message = "System.Exception" });
      }
    }
  }
}



