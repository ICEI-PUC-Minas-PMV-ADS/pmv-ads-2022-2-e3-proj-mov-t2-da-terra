using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models;

public class Usuario
{
  [Key]
  public int Id { get; set; }

  public string Nome { get; set; }
  public string DataNascimento { get; set; }
  public string Cpf { get; set; }
  public string Telefone { get; set; }
  public string Rua { get; set; }
  public string Bairro { get; set; }
  public int NumeroCasa { get; set; }
  public int Cep { get; set; }
  public string Cidade { get; set; }
  public string Uf { get; set; }
  public string Complemento { get; set; }
  public string Email { get; set; }
  public string Senha { get; set; }
  public string TipoUsuario { get; set; }
  public string NomeLoja { get; set; }
  public string DataCadastro { get; set; }
}
/*
{
    "nome": "Joana",
    "dataNascimento": "20/10/1999",
    "cpf": "12345678",
    "telefone": "534252345",
    "rua": "Castelo",
    "bairro": "Alto bela vista",
    "numeroCasa": 222,
    "cep": 330101515,
    "cidade": "Belo Horizonte",
    "uf": "gn",
    "complemento": "Perto do bar 2123",
    "email": "j@email.com",
    "senha": "123456",
    "tipoUsuario": "cliente",    
    "nomeLoja": "null"
}
*/