using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using web_design_project.Models;
using Microsoft.EntityFrameworkCore;
using web_design_project.Dto;

namespace web_design_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private readonly DocumentDbContext _context;

        public CompanyController(DocumentDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Company>> Index()
        {
            return _context.Companies.ToList();
        }

        [HttpPost]
        public async Task<Company> Create([Bind("name,description")] Company company){
            if(ModelState.IsValid){
                _context.Companies.Add(company);
                await _context.SaveChangesAsync();
            }
            return company;
        }

        [HttpPatch]
        public async Task<ActionResult<Company>> Edit(Company company){
            if(ModelState.IsValid){
                var targetCompany = await _context.Companies.FindAsync(company.CompanyId);
                if(targetCompany == null){
                    return NotFound();
                }
                targetCompany.name = company.name;
                targetCompany.description = company.description;
                _context.Companies.Update(targetCompany);
                await _context.SaveChangesAsync();
            }
            return company;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> Detail(int? id){
            if(id == null){
                return NotFound();
            }
            var company = await _context.Companies
                .Include(c => c.employees)
                .ThenInclude(e => e.documents)
                .ThenInclude(a => a.address)
                .FirstOrDefaultAsync(c => c.CompanyId == id);
            return company;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Company>> Delete(int? id){
            if (id == null)
            {
                return NotFound();
            }
            var company = await _context.Companies.FindAsync(id);
            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
            return company;
        }
    }
}