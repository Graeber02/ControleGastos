using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

public class CategoriaService
{
    private readonly JsonRepository<Categoria> _repo;

    public CategoriaService()
    {
        _repo = new JsonRepository<Categoria>("categorias.json");
    }

    public List<Categoria> Listar() => _repo.GetAll();

    public async Task <Categoria> Criar(Categoria categoria)
    {
        var categorias = _repo.GetAll();

        categoria.Id = categorias.Any() ? categorias.Max(c => c.Id) + 1 : 1;

        categorias.Add(categoria);
        _repo.SaveAll(categorias);

        return categoria;
    }

    // Editar categoria existente
    public async Task <Categoria> Editar(int id, Categoria categoriaAtualizada)
    {
        var categorias = _repo.GetAll();

        var categoria = categorias.FirstOrDefault(c => c.Id == id);
        if (categoria == null)
            throw new Exception("Categoria não encontrada");

        categoria.Descricao = categoriaAtualizada.Descricao;
        categoria.Finalidade = categoriaAtualizada.Finalidade;

        _repo.SaveAll(categorias);
        return categoria;
    }
}