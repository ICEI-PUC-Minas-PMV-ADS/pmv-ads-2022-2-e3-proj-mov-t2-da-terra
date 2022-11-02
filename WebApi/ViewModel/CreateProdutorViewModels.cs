using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.ViewModel
{
  public class CreateProdutorViewModels
  {
    public string NomeLoja { get; set; }

    public ICollection<Produto> Produtos { get; set; }
  }
}