using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service = new();

    [HttpGet("Listar")]
    public IActionResult Listar()
        => Ok(_service.Listar());

    [HttpPost("Incluir")]
    public IActionResult Criar(TransacaoDto dto)
    {
        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId,
            CategoriaId = dto.CategoriaId
        };

        return Ok(_service.Criar(transacao));
    }
}