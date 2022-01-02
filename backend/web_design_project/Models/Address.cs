using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web_design_project.Models
{
    public class Address
    {
        public Address(){
            this.documents = new List<Document>();
        }
        public int AddressId { get; set; }
        [Required]
        [StringLength(100)]
        public string direction { get; set; }
        [Required]
        [StringLength(100)]
        public string province  { get; set; }
        [Required]
        [StringLength(100)]
        public string district { get; set; }
        public List<Document> documents { get; set; }
    }
}