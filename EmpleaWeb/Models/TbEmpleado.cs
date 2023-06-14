using System;
using System.Collections.Generic;

namespace EmpleaWeb.Models
{
    public partial class TbEmpleado
    {
        public int Id { get; set; }
        public string Dpi { get; set; } = null!;
        public string NombreCompleto { get; set; } = null!;
        public int CantidadHijos { get; set; }
        public double BonoDecreto { get; set; }
        public DateTime FechaCreacion { get; set; }
        public double SalarioBase { get; set; }
    }
}
