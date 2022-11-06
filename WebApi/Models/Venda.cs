namespace WebApi.Models;

public class Venda
{
   
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Horas { get; set; }


        public Venda(int id, string nome, string data)
        {
            Id = id;
            Nome = nome;
            Horas = data;
        }
    }
