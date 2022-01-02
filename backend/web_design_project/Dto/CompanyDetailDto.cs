using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_design_project.Models;

namespace web_design_project.Dto
{
    public class CompanyDetailDto
    {
        public Company company { get; set; }
        public List<Address> addresses { get; set; } 
    }
}