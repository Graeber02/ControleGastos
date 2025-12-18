using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class PessoasController : ControllerBase
{
    private readonly PessoaService _service = new();

    [HttpGet("Listar")]
    public IActionResult Listar()
        => Ok(_service.Listar());

    [HttpPost("Incluir")]
    public IActionResult Criar([FromBody] PessoaDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var pessoa = new Pessoa
        {
            Nome = dto.nome,
            Idade = dto.idade
        };

        var criada = _service.Criar(pessoa);

        return CreatedAtAction(nameof(Listar), criada);
    }

    [HttpDelete("Delete/{id}")]
    public IActionResult Deletar(int id)
    {
        _service.Deletar(id);
        return NoContent();
    }
}