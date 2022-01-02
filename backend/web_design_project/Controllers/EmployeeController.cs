using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using web_design_project.Models;

namespace web_design_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly DocumentDbContext _context;

        public EmployeeController(DocumentDbContext context)
        {
            _context = context;
        }
        
        [HttpPatch]
        public async Task<ActionResult<Employee>> Edit(Employee employee){
            if(ModelState.IsValid){
                var targetEmployee = await _context.Employees.FindAsync(employee.EmployeeId);
                if(targetEmployee == null){
                    return NotFound();
                }
                targetEmployee.FirstName = employee.FirstName;
                targetEmployee.LastName = employee.LastName;
                targetEmployee.Salary = employee.Salary;
                _context.Employees.Update(targetEmployee);
                await _context.SaveChangesAsync();
            }
            return employee;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int? id){
            if (id == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);
            if(employee == null){
                return NotFound();
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Detail(int? id){
            if(id == null){
                return NotFound();
            }
            var employee = await _context.Employees
            .Include(c => c.documents)
            .ThenInclude(a => a.address)
            .FirstOrDefaultAsync(c => c.EmployeeId == id);
            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee([Bind("FirstName,LastName,Salary,CompanyId")] Employee employee){
            if(ModelState.IsValid){
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
            }
            return employee;
        }
    }
}