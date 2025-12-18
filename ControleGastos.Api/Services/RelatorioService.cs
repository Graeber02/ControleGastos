using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

public class RelatorioService
{
    private readonly JsonRepository<Pessoa> _pessoasRepo;
    private readonly JsonRepository<Categoria> _categoriasRepo;
    private readonly JsonRepository<Transacao> _transacoesRepo;

    public RelatorioService()
    {
        _pessoasRepo = new JsonRepository<Pessoa>("pessoas.json");
        _categoriasRepo = new JsonRepository<Categoria>("categorias.json");
        _transacoesRepo = new JsonRepository<Transacao>("transacoes.json");
    }

    /// <summary>
    /// Retorna totais de receitas, despesas e saldo agrupados por pessoa
    /// </summary>
    public object TotaisPorPessoa()
    {
        var pessoas = _pessoasRepo.GetAll();
        var transacoes = _transacoesRepo.GetAll();

        var resultadoPorPessoa = pessoas.Select(pessoa =>
        {
            var transacoesPessoa = transacoes
                .Where(t => t.PessoaId == pessoa.Id);

            var totalReceitas = transacoesPessoa
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = transacoesPessoa
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new
            {
                PessoaId = pessoa.Id,
                Pessoa = pessoa.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        return new
        {
            Pessoas = resultadoPorPessoa,
            TotalGeralReceitas = resultadoPorPessoa.Sum(p => p.TotalReceitas),
            TotalGeralDespesas = resultadoPorPessoa.Sum(p => p.TotalDespesas),
            SaldoGeral = resultadoPorPessoa.Sum(p => p.Saldo)
        };
    }

    /// <summary>
    /// Retorna totais de receitas, despesas e saldo agrupados por categoria
    /// </summary>
    public object TotaisPorCategoria()
    {
        var categorias = _categoriasRepo.GetAll();
        var transacoes = _transacoesRepo.GetAll();

        var resultadoPorCategoria = categorias.Select(categoria =>
        {
            var transacoesCategoria = transacoes
                .Where(t => t.CategoriaId == categoria.Id);

            var totalReceitas = transacoesCategoria
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            var totalDespesas = transacoesCategoria
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new
            {
                CategoriaId = categoria.Id,
                Categoria = categoria.Descricao,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        return new
        {
            Categorias = resultadoPorCategoria,
            TotalGeralReceitas = resultadoPorCategoria.Sum(c => c.TotalReceitas),
            TotalGeralDespesas = resultadoPorCategoria.Sum(c => c.TotalDespesas),
            SaldoGeral = resultadoPorCategoria.Sum(c => c.Saldo)
        };
    }
}