using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;
using BCrypt.Net;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template:"v1")]
  public class ProdutoresController : ControllerBase
  {
    [HttpGet(template: "produtores")]
    public async Task<IActionResult> GetProdutores(
        [FromServices] AppDbContext context)
    {
      var produtor = await context.Produtores.ToListAsync();
      return Ok(produtor);
    }
  }
}