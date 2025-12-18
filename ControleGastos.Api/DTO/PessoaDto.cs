using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.DTOs;

public class PessoaDto
{
    [Required(ErrorMessage = "Nome é obrigatório")]
    [MinLength(2, ErrorMessage = "Nome deve ter no mínimo 2 caracteres")]
    public string nome { get; set; } = string.Empty;

    [Required]
    [Range(1, 150, ErrorMessage = "Idade deve ser maior que zero")]
    public int idade { get; set; }
}