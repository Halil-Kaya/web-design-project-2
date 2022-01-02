using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web_design_project.Models
{
    public class Company
    {
        public Company(){
            this.employees = new List<Employee>();
        }
        public int CompanyId { get; set; }
        [Required]
        [StringLength(100)]
        public string name { get; set; }
        [Required]
        [StringLength(100)]
        public string description { get; set; }
        public List<Employee> employees { get; set; }
    }
}