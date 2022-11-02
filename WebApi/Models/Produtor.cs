using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
  public class Produtor : Usuario
  {
    public string NomeLoja { get; set; }

    public ICollection<Produto> Produtos { get; set; }
  }
}