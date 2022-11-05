using Microsoft.Build.Framework;

namespace WebApi.ViewModel;

public class CreateClienteViewModel
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
  public string TipoUsuario { get; set; }

  public string DataCadastro { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
}