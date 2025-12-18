using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.DTOs;

public class CategoriaDto
{
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MinLength(3)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [EnumDataType(typeof(FinalidadeCategoria), ErrorMessage = "Finalidade inválida")]
    public FinalidadeCategoria Finalidade { get; set; }
}