using System.ComponentModel.DataAnnotations;

namespace WebApiDaTerra.ViewModels;

public class CreateProdutosViewModel
{
    [Required]
    public string Title { get; set; }
}