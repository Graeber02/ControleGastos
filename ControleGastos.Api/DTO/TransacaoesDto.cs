using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.DTOs;

public class TransacaoDto
{
    [Required]
    [MinLength(3)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser positivo")]
    public decimal Valor { get; set; }

    [Required]
    [EnumDataType(typeof(TipoTransacao))]
    public TipoTransacao Tipo { get; set; }

    [Required]
    public int PessoaId { get; set; }

    [Required]
    public int CategoriaId { get; set; }
}