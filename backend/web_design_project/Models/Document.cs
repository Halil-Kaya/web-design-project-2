using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web_design_project.Models
{
    public class Document
    {
        public int DocumentId { get; set; }
        [Required]
        [StringLength(100)]
        public string title { get; set; }
        [Required]
        [StringLength(100)]
        public string content { get; set; }
        public bool isApproved { get; set; }
        public Address address { get; set; }
        public int AddressId { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
    }
}