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

        [HttpPost]
        [Route("Autenticar")]
        public async Task<IActionResult> Autenticar([FromBody] TbUsuario usuario)
        {
            // Verificar si el usuario y contraseña coinciden en la tabla "Usuarios"
            var usuarioAutenticado = await _dbcontext.TbUsuarios.FirstOrDefaultAsync(u => u.Name == usuario.Name && u.Password == usuario.Password);

            if (usuarioAutenticado == null)
            {
                // El usuario y/o contraseña son incorrectos
                return StatusCode(StatusCodes.Status401Unauthorized, "Usuario o contraseña incorrectos");
            }

            // Autenticación exitosa, puedes realizar acciones adicionales aquí si es necesario

            return StatusCode(StatusCodes.Status200OK, "Autenticación exitosa");
        }




    }
}
