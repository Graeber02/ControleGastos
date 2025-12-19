namespace ControleGastos.Api.Models;

public class Transacao
{
    //ID auto Incrementado
    public int Id { get; set; } 
    public string Descricao { get; set; } = string.Empty;

    // Valor sempre positivo
    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    // Relacionamentos
    public int PessoaId { get; set; }
    public int CategoriaId { get; set; }
}
