using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly RelatorioService _service = new();

    // Retorna relatório de totais por pessoa
    [HttpGet("PorPessoa")]
    public IActionResult TotaisPorPessoa()
    {
        return Ok(_service.TotaisPorPessoa());
    }

    // Retorna relatório de totais por categoria
    [HttpGet("PorCategoria")]
    public IActionResult TotaisPorCategoria()
    {
        return Ok(_service.TotaisPorCategoria());
    }
}