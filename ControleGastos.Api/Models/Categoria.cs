namespace ControleGastos.Api.Models;

public class Categoria
{
    //Id auto-incremental
    public int Id { get; set; }

    // Ex: Alimentação, Salário
    public string Descricao { get; set; } = string.Empty;

    // Despesa / Receita / Ambas
    public FinalidadeCategoria Finalidade { get; set; }
}