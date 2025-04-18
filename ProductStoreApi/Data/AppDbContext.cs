using Microsoft.EntityFrameworkCore;
using ProductStoreApi.Models;

namespace ProductStoreApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LogEntry> Logs { get; set; }
    }
}
