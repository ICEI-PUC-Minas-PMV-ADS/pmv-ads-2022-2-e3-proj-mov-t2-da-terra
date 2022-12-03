using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
  public class Image
  {
    public Guid Id { get; set; }
    public string Description { get; set; }
    public string Extension { get; set; }
    public int Length { get; set; }
    public byte[] Picture { get; set; }
    public string ContentType { get; set; }
  }
}