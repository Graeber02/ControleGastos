using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("[controller]")]

    public class CategoriasController : ControllerBase
{
    private readonly CategoriaService _service = new();

    [HttpGet("Listar")]
    public IActionResult Listar()
        => Ok(_service.Listar());


    [HttpPost("Incluir")]
    public async Task<IActionResult> Criar(CategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        return Ok(await _service.Criar(categoria));
    }

    [HttpPut("Editar/{id}")]
    public async Task <IActionResult> Editar(int id, CategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        return Ok(_service.Editar(id, categoria));
    }
}