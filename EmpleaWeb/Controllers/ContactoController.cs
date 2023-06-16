using EmpleaWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

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

        [HttpPost]
        [Route("AutenticarRecovery")]
        public async Task<IActionResult> AutenticarRecovery([FromBody] TbUsuario usuario)
        {
            // Verificar si el email y fecha de nacimiento coinciden en la tabla "Usuarios"
            var usuarioAutenticado = await _dbcontext.TbUsuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email && u.FechaNacimiento == usuario.FechaNacimiento);//&& u.FechaNacimiento == usuario.FechaNacimiento
            Console.WriteLine(usuario.Email," : ",usuario.FechaNacimiento);

            if (usuarioAutenticado == null)
            {
                // El email y/o fecha de nacimiento son incorrectos
                return StatusCode(StatusCodes.Status401Unauthorized, "El correo electrónico y/o fecha de nacimiento son incorrectos");
            }

            // Autenticación exitosa, puedes realizar acciones adicionales aquí si es necesario

            return StatusCode(StatusCodes.Status200OK, "Autenticación exitosa");
        }

        [HttpPost]
        [Route("EnviarCorreoToken")]
        public IActionResult EnviarCorreoToken([FromBody] Correo correo)
        {
            // Aquí irá tu lógica para enviar el correo electrónico con el token

            // Configurar los detalles del correo
            string remitente = "recoverytokenpass@gmail.com";
            string contraseña = "gvuxuqkxbkfaioyt";

            string destinatario = correo.Email;
            string asunto = correo.Asunto; // Utilizar el asunto proporcionado en el objeto Correo
            string cuerpo = correo.Cuerpo; // Utilizar el cuerpo proporcionado en el objeto Correo


            // Crear el cliente SMTP
            SmtpClient clienteSmtp = new SmtpClient("smtp.gmail.com", 587);
            clienteSmtp.EnableSsl = true;
            clienteSmtp.UseDefaultCredentials = false;
            clienteSmtp.Credentials = new NetworkCredential(remitente, contraseña);

            // Crear el mensaje
            MailMessage mensaje = new MailMessage(remitente, destinatario, asunto, cuerpo);
            mensaje.IsBodyHtml = true;

            // Enviar el mensaje
            try
            {
                clienteSmtp.Send(mensaje);
                return Ok("Correo enviado con éxito");
            }
            catch (SmtpException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public class Correo
        {
            public string Email { get; set; }
            public string Asunto { get; set; }
            public string Cuerpo { get; set; }
        }

        //api para verifiacr el correo y devuelve el tokenrecovery
        [HttpPost]
        [Route("Tokenreturn")]
        public async Task<IActionResult> Tokenreturn([FromBody] TbUsuario usuario)
        {
            // Verificar si el email y fecha de nacimiento coinciden en la tabla "Usuarios"
            var usuarioAutenticado = await _dbcontext.TbUsuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email );

            if (usuarioAutenticado == null)
            {
                // El email y/o fecha de nacimiento son incorrectos
                return StatusCode(StatusCodes.Status401Unauthorized, "El correo electrónico es incorrecto");
            }

            // Obtener el token_recovery del usuario autenticado
            string tokenRecovery = usuarioAutenticado.TokenRecovery;

            // Autenticación exitosa, puedes realizar acciones adicionales aquí si es necesario

            return StatusCode(StatusCodes.Status200OK, tokenRecovery);
        }

        [HttpPost]
        [Route("RestablecerContrasena")]
        public async Task<IActionResult> RestablecerContrasena([FromBody] TbUsuario usuario)
        {
            // Verificar si el correo electrónico es válido
            var usuarioExistente = await _dbcontext.TbUsuarios.FirstOrDefaultAsync(u => u.Email == usuario.Email);
            if (usuarioExistente == null)
            {
                // El usuario con el correo electrónico dado no existe
                return StatusCode(StatusCodes.Status404NotFound, "No se encontró ningún usuario con el correo electrónico proporcionado");
            }

            // Actualizar la contraseña del usuario con la nueva contraseña
            usuarioExistente.Password = usuario.Password;
           

            try
            {
                // Guardar los cambios en la base de datos
                await _dbcontext.SaveChangesAsync();

                // Puedes enviar una respuesta exitosa si lo deseas
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                // Ocurrió un error al guardar los cambios en la base de datos
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocurrió un error al restablecer la contraseña");
            }
        }








    }
}
