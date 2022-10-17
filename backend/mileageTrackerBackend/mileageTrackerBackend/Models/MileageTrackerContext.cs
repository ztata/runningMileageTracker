using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace mileageTrackerBackend.Models
{
    public class MileageTrackerContext : DbContext
    {
        public DbSet<LoggedRun> LoggedRuns { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json", optional: false);
            var configuration = builder.Build();
            var connectionString = configuration.GetValue<string>("ConnectionStrings:connectionString");

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
