using Microsoft.AspNetCore.Mvc;
using mileageTrackerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mileageTrackerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggedRunController : ControllerBase
    {
        // GET: api/<LoggedRunController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LoggedRunController>/5
        [HttpGet("{id}")]
        public List<LoggedRun> Get(int id)
        {
            List<LoggedRun> result = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                result = context.LoggedRuns.Where(x => x.UserId == id).ToList();
            }
            return result;
        }

        // POST api/<LoggedRunController>
        [HttpPost]
        public void Post([FromBody] LoggedRun run)
        {
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                //if (run.Date == null)
                //{
                //    run.Date = DateTime.Today;
                //}
                context.LoggedRuns.Add(run);
                context.SaveChanges();
            }
        }

        // PUT api/<LoggedRunController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] LoggedRun run)
        {
            LoggedRun result = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                result = context.LoggedRuns.Where(x => x.RunId == id).First();
                result.Name = run.Name;
                result.Length = run.Length;
                result.Date = run.Date;
                context.LoggedRuns.Update(result);
                context.SaveChanges();
            }
        }

        // DELETE api/<LoggedRunController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            LoggedRun result = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                result = context.LoggedRuns.Where(x => x.RunId == id).First();
                context.LoggedRuns.Remove(result);
                context.SaveChanges();
            }
        }
    }
}
