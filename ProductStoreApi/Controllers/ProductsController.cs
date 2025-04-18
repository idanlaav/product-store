using Microsoft.AspNetCore.Mvc;
using ProductStoreApi.Data;
using ProductStoreApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ProductStoreApi.Hubs;

namespace ProductStoreApi.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<UserHub> _hub;

        public ProductController(AppDbContext context, IHubContext<UserHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        // Get all products
        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        // Add a new product
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Create(Product product)
        {
            _context.Products.Add(product);
            _context.Logs.Add(new LogEntry
            {
                Message = $"Product created: {product.Name}"
            });
            _context.SaveChanges();

            _hub.Clients.All.SendAsync("ProductEvent", $"Product created: {product.Name}");
            return CreatedAtAction(nameof(GetAll), new { id = product.Id }, product);
        }

        // Update product
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(int id, Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (product == null)
                return NotFound();

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.Quantity = updatedProduct.Quantity;

            _context.Logs.Add(new LogEntry
            {
                Message = $"Product updated: {product.Name}"
            });
            _context.SaveChanges();

            _hub.Clients.All.SendAsync("ProductEvent", $"Product updated: {product.Name}");
            return Ok(product);
        }

        // Delete product
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            _context.Logs.Add(new LogEntry
            {
                Message = $"Product deleted: {product.Name}"
            });
            _context.SaveChanges();

            _hub.Clients.All.SendAsync("ProductEvent", $"Product deleted: {product.Name}");
            return Ok(); 
        }
    }
}
