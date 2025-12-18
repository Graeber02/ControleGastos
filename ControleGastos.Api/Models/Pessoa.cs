namespace ControleGastos.Api.Models;

public class Pessoa
{
    // Id autoIncrementado
    public int Id { get; set; }

    // Nome da pessoa
    public string Nome { get; set; } = string.Empty;

    // Idade deve ser um número inteiro positivo
    public int Idade { get; set; }
}
