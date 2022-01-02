using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using web_design_project.Models;


namespace web_design_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly DocumentDbContext _context;

        public DocumentController(DocumentDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Document>> CreateDocument(Document document){
            _context.Documents.Add(document);
            await _context.SaveChangesAsync();
            return document;
        }

        [HttpPatch]
        public async Task<ActionResult<Document>> EditDocument(Document document){
            if(ModelState.IsValid){
                var targetDocument = await _context.Documents.FindAsync(document.DocumentId);
                if(targetDocument == null){
                    return NotFound();
                }
                targetDocument.title = document.title;
                targetDocument.content = document.content;
                targetDocument.isApproved = document.isApproved;
                targetDocument.AddressId = document.AddressId;
                _context.Documents.Update(targetDocument);
                await _context.SaveChangesAsync();
            }
            return document;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Document>> DeleteDocument(int id){
            if (id == null){
                return NotFound();
            }
            var document = await _context.Documents.FindAsync(id);
            if(document == null){
                return NotFound();
            }
            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();
            return document;
        }
    }
}