﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using web_design_project.Models;

namespace web_design_project.Migrations
{
    [DbContext(typeof(DocumentDbContext))]
    [Migration("20211127191207_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("web_design_project.Models.Address", b =>
                {
                    b.Property<int>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("direction")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("district")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("province")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("AddressId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("web_design_project.Models.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("web_design_project.Models.Document", b =>
                {
                    b.Property<int>("DocumentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AddressId")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("content")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("isApproved")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("title")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("DocumentId");

                    b.HasIndex("AddressId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("web_design_project.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.HasKey("EmployeeId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("web_design_project.Models.Document", b =>
                {
                    b.HasOne("web_design_project.Models.Address", "address")
                        .WithMany("documents")
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web_design_project.Models.Employee", "Employee")
                        .WithMany("documents")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("web_design_project.Models.Employee", b =>
                {
                    b.HasOne("web_design_project.Models.Company", "Company")
                        .WithMany("employees")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}