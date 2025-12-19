using System.Text.Json;

namespace ControleGastos.Api.Repositories;

public class JsonRepository<T>
{
    private readonly string _filePath;

    public JsonRepository(string fileName)
    {
        _filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", fileName);

        // Garante que o arquivo exista
        if (!File.Exists(_filePath))
            File.WriteAllText(_filePath, "[]");
    }

    public List<T> GetAll()
    {
        try
        {
            var json = File.ReadAllText(_filePath);

            // Se o arquivo estiver vazio ou só com espaços
            if (string.IsNullOrWhiteSpace(json))
                return new List<T>();

            // Caso esteja {} em vez de []
            if (json.Trim() == "{}")
                return new List<T>();

            var result = JsonSerializer.Deserialize<List<T>>(json);

            return result ?? new List<T>();
        }
        catch
        {
            // Em caso de qualquer erro de leitura ou desserialização,
            // retornamos lista vazia para não quebrar a aplicação
            return new List<T>();
        }
    }




    public void SaveAll(List<T> data)
    {
        var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
        {
            WriteIndented = true
        });

        File.WriteAllText(_filePath, json);
    }
}