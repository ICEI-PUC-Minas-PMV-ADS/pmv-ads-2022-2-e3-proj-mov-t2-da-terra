using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models;
using WebApi.ViewModel;

namespace WebApi.Controllers
{
  [ApiController]
  [Route(template: "v1")]
  public class ImagesController : ControllerBase
  {
    [HttpGet]
    public IActionResult Index([FromServices] AppDbContext db)
    {
      return Ok(db.Image.ToList());
    }

    [HttpGet]
    public IActionResult Create()
    {
      return Ok();
    }

    [HttpPost(template: "produto/imagem")]
    //[Consumes("multipart/form-data")]
    public IActionResult Create(
      Image Image,
      [FromForm] IFormFile Img,
      [FromServices] AppDbContext db
      // [FromBody] CreateImageViewModel model
      )
    {
      if (!ModelState.IsValid)
        return BadRequest(new { message = "Model Inválido" });

      Image.Picture = Img.ToByteArray();
      Image.Length = (int)Img.Length;
      Image.Extension = Img.GetExtension();
      Image.ContentType = Img.ContentType;

      db.Image.Add(Image);
      db.SaveChanges();

      return Ok(new { message = "Imagem inserida" });
    }

    [HttpGet]
    [ResponseCache(Duration = 3600)]
    public FileResult Render(string id, [FromServices] AppDbContext db)
    {
      Guid _id = Guid.Parse(id);

      var item = db.Image
          .Where(x => x.Id == _id)
          .Select(s => new { s.Picture, s.ContentType })
          .FirstOrDefault();

      if (item != null)
      {
        return File(item.Picture, item.ContentType);
      }

      return null;
    }
  }
}