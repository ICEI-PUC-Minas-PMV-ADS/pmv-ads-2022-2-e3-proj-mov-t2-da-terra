using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Models;

public class Pedido
{
  public int Id { get; set; }

  public int ClienteId { get; set; }
  [ForeignKey("ClienteId")]
  public Cliente Cliente;

  public int ProdutorId { get; set; }
  [ForeignKey("ProdutorId")]
  public Produtor Produtor;

  //public string NomeCliente { get; set; }

  public decimal PrecoTotalPedido { get; set; }
  // Enviado, Pendente, Finalizado
  public string Status { get; set; }
  public string DataPedido { get; set; }

  public ICollection<Produto> Produtos;


  public void AtualizarStatus(string mensagem)
  {
    Status = mensagem;
  }
  
}