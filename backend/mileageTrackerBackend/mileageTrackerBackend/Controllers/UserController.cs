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
    public class UserController : ControllerBase
    {
        // GET: api/<UserController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User LoginUser(string email, string password)
        {
            //ADD IN LOGIC HERE TO HASH THE PASSWORD AND COMPARE THE HASH NOT THE ACTUAL PASSWORD

            User result = null;

            bool validEmailAndPassword = HashPassword.CompareHashedPasswords(email, password);

            if (validEmailAndPassword)
            {
                using (MileageTrackerContext context = new MileageTrackerContext())
                {
                    result = context.Users.Where(x => x.Email == email).First();
                }
            }

            return result;
        }

        // POST api/<UserController>
        [HttpPost]
        public void CreateUser([FromBody] string firstName, string lastName, string email, string password)
        {
            bool doesEmailExist = HelperUserMethods.CheckIfUserEmailExists(email);

            if (doesEmailExist == false)
            {
                User newUser = new User(firstName, lastName, email,password);
                using (MileageTrackerContext context = new MileageTrackerContext())
                {
                    context.Users.Add(newUser);
                    context.SaveChanges();
                    //return "User Created Successfully";
                }
            }
            else
            {
                //return "User email already exists";
                throw new Exception("A user with this email already exists");
            }

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void UpdateUser(int id, [FromBody] string firstName, string lastName, string email, string password)
        {
            User user = null;

            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                try
                {
                    user = context.Users.Where(x => x.UserId == id).First();
                    user.FirstName = firstName;
                    user.LastName = lastName;
                    bool doesEmailExist = HelperUserMethods.CheckIfUserEmailExists(email);
                    if (doesEmailExist == false)
                    {
                        user.Email = firstName;
                    }
                    else
                    {
                        throw new Exception("A user with this email already exists in the database");
                    }
                    string hashedPassword = HashPassword.ConvertPasswordToHashedString(password);
                    user.Password = hashedPassword;
                    context.SaveChanges();
                }
                catch (Exception)
                {

                    throw new Exception("No user with this id is found in the database");
                }
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
            User user = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                try
                {
                    user = context.Users.Where(x => x.UserId == id).First();
                    context.Users.Remove(user);
                    context.SaveChanges();
                }
                catch (Exception)
                {
                    throw new Exception("a user with this Id does not exist");
                }
            }
        }
    }
}
