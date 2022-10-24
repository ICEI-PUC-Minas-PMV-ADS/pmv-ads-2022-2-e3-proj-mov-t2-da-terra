namespace WebApiDaTerra.models;

public class Produto
{
    public int Id { get; set; }
    public string NomeProduto { get; set; }
    public decimal Preco { get; set; }
    public string Embalagem { get; set; }
    public int Estoque { get; set; }
    public string Categoria { get; set; }
    public string Descricao { get; set; }
}