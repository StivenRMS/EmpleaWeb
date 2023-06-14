using EmpleaWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EmpleaWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly bd_pruebaContext _dbcontext;

        public ContactoController(bd_pruebaContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("GetEmpleados")]
        public async Task<IActionResult> GetEmpleados()
        {
            List<TbEmpleado> empleados = await _dbcontext.TbEmpleados.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, empleados);
        }

        [HttpPost]
        [Route("AddEmpleado")]
        public async Task<IActionResult> AddEmpleado([FromBody] TbEmpleado empleado)
        {
            await _dbcontext.TbEmpleados.AddAsync(empleado);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] TbEmpleado empleado)
        {
            _dbcontext.TbEmpleados.Update(empleado);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            TbEmpleado empleado = _dbcontext.TbEmpleados.Find(id);
            _dbcontext.TbEmpleados.Remove(empleado);
            await _dbcontext.SaveChangesAsync();


            return StatusCode(StatusCodes.Status200OK, "ok");

        }
    }
}
