using System;
using System.Collections.Generic;

namespace EmpleaWeb.Models
{
    public partial class TbUsuario
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime? FechaNacimiento { get; set; }
        public string? TokenRecovery { get; set; }
        public string Password { get; set; } = null!;
    }
}
