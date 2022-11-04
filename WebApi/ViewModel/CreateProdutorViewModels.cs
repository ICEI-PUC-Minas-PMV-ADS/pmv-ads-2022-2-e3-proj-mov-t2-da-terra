using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Build.Framework;
using WebApi.Models;

namespace WebApi.ViewModel
{
  public class CreateProdutorViewModels
  {
    public int Id { get; set; } 
    [Required]
    public string Nome { get; set; }
    [Required]

    public string DataNascimento { get; set; }
    [Required]

    public string Cpf { get; set; }
    [Required]

    public string Telefone { get; set; }
    [Required]

    public string Rua { get; set; }
    [Required]

    public string Bairro { get; set; }
    [Required]

    public int NumeroCasa { get; set; }
    [Required]

    public int Cep { get; set; }
    [Required]

    public string Cidade { get; set; }
    [Required]

    public string Uf { get; set; }
    [Required]

    public string Complemento { get; set; }
    [Required]

    public string Email { get; set; }
    [Required]

    public string Senha { get; set; }
    [Required]

    public string NomeLoja { get; set; }
    [Required]

    public string DataCadastro { get; set; } 
  }
}