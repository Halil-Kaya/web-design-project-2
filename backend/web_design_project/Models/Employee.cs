using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web_design_project.Models
{
    public class Employee
    {
        public Employee(){
            this.documents = new List<Document>();
        }
        public int EmployeeId { get; set; }
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        [Required]
        public int Salary { get; set; }
        public List<Document> documents { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }
    }
}