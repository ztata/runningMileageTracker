using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mileageTrackerBackend.Models
{
    public class LoggedRun
    {
        [Key]
        public int RunId { get; set; }

        //foreign key to the user table to allow runs to be associated with individual users
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public double Length { get; set; }
        public DateTime Date { get; set; }

    }
}
