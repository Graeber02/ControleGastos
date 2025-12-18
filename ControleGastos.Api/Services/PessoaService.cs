using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

public class PessoaService
{
    private readonly JsonRepository<Pessoa> _pessoasRepo;
    private readonly JsonRepository<Transacao> _transacoesRepo;

    public PessoaService()
    {
        _pessoasRepo = new JsonRepository<Pessoa>("pessoas.json");
        _transacoesRepo = new JsonRepository<Transacao>("transacoes.json");
    }

    public List<Pessoa> Listar() => _pessoasRepo.GetAll();

    public Pessoa Criar(Pessoa pessoa)
    {
        if (pessoa.Idade <= 0)
            throw new Exception("Idade inválida");

        var pessoas = _pessoasRepo.GetAll();

        // Auto incremento do ID
        pessoa.Id = pessoas.Any() ? pessoas.Max(p => p.Id) + 1 : 1;

        pessoas.Add(pessoa);
        _pessoasRepo.SaveAll(pessoas);

        return pessoa;
    }

    // Ao excluir pessoa, remove também todas as transações dela
    public void Deletar(int id)
    {
        var pessoas = _pessoasRepo.GetAll();
        pessoas.RemoveAll(p => p.Id == id);
        _pessoasRepo.SaveAll(pessoas);

        var transacoes = _transacoesRepo.GetAll();
        transacoes.RemoveAll(t => t.PessoaId == id);
        _transacoesRepo.SaveAll(transacoes);
    }
}