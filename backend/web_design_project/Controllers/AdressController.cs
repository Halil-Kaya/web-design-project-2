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
    public class AdressController : Controller
    {
        private readonly DocumentDbContext _context;

        public AdressController(DocumentDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Address>> Index()
        {
            return _context.Addresses.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Address>> CreateAddress(Address address){
            if(ModelState.IsValid){
                _context.Addresses.Add(address);
                await _context.SaveChangesAsync();
            }
            return address;
        }
    }
}