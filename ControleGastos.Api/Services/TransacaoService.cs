using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

public class TransacaoService
{
    private readonly JsonRepository<Transacao> _repo;
    private readonly JsonRepository<Pessoa> _pessoasRepo;
    private readonly JsonRepository<Categoria> _categoriasRepo;

    public TransacaoService()
    {
        _repo = new JsonRepository<Transacao>("transacoes.json");
        _pessoasRepo = new JsonRepository<Pessoa>("pessoas.json");
        _categoriasRepo = new JsonRepository<Categoria>("categorias.json");
    }

    public List<Transacao> Listar() => _repo.GetAll();

    public async Task <Transacao> Criar(Transacao transacao)
    {
        if (transacao.Valor <= 0)
            throw new Exception("Valor deve ser positivo");

        var pessoa = _pessoasRepo.GetAll()
            .FirstOrDefault(p => p.Id == transacao.PessoaId)
            ?? throw new Exception("Pessoa não encontrada");

        // Menor de idade só pode despesa
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            throw new Exception("Menor de idade não pode ter receita");

        var categoria = _categoriasRepo.GetAll()
            .FirstOrDefault(c => c.Id == transacao.CategoriaId)
            ?? throw new Exception("Categoria não encontrada");

        // Validação da finalidade
        if (categoria.Finalidade != FinalidadeCategoria.Ambas)
        {
            if (transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade != FinalidadeCategoria.Despesa)
                throw new Exception("Categoria inválida para despesa");

            if (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade != FinalidadeCategoria.Receita)
                throw new Exception("Categoria inválida para receita");
        }

        var transacoes = _repo.GetAll();
        transacao.Id = transacoes.Any() ? transacoes.Max(t => t.Id) + 1 : 1;

        transacoes.Add(transacao);
        _repo.SaveAll(transacoes);

        return transacao;
    }
}