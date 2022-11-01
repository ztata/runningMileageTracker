using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace mileageTrackerBackend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [StringLength(40)]
        [Required]
        public string FirstName { get; set; }

        [StringLength(40)]
        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public ICollection<LoggedRun> Runs { get; set; }

        public User()
        {

        }
        public User(string firstName, string lastName, string email, string password)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            string hashedPassword = HashPassword.ConvertPasswordToHashedString(password);
            Password = hashedPassword;
        }
    }
}
