var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// ?? CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ? CORS TEM QUE VIR AQUI
app.UseCors("AllowFrontend");

// (se no futuro usar auth, ele vem depois)
app.UseAuthorization();

app.MapControllers();

app.Run();