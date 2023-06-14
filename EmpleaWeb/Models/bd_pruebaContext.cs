using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EmpleaWeb.Models
{
    public partial class bd_pruebaContext : DbContext
    {
        public bd_pruebaContext()
        {
        }

        public bd_pruebaContext(DbContextOptions<bd_pruebaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbEmpleado> TbEmpleados { get; set; } = null!;
        public virtual DbSet<TbUsuario> TbUsuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOPRMS\\SQLEXPRESS; DataBase=bd_prueba;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TbEmpleado>(entity =>
            {
                entity.ToTable("Tb_Empleados");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BonoDecreto).HasColumnName("bono_decreto");

                entity.Property(e => e.CantidadHijos).HasColumnName("cantidad_hijos");

                entity.Property(e => e.Dpi)
                    .HasMaxLength(45)
                    .IsUnicode(false)
                    .HasColumnName("dpi");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("date")
                    .HasColumnName("fecha_creacion");

                entity.Property(e => e.NombreCompleto)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre_completo");

                entity.Property(e => e.SalarioBase).HasColumnName("salario_base");
            });

            modelBuilder.Entity<TbUsuario>(entity =>
            {
                entity.ToTable("Tb_Usuarios");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("date")
                    .HasColumnName("fecha_nacimiento");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.TokenRecovery)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("token_recovery");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
