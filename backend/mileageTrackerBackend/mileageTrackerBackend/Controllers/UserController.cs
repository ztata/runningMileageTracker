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
        public string Get()
        {
            string message = "API is working";
            
            return message;
        }

        // GET https://localhost:44324/api/user/email/password
        [HttpGet("{email}/{password}")]
        public User LoginUser(string email, string password)
        {
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

        // POST api/user include a json object in the body of the call
        [HttpPost]
        public void CreateUser([FromBody]User user)
        {
            bool doesEmailExist = HelperUserMethods.CheckIfUserEmailExists(user.Email);

            if (doesEmailExist == false)
            {
                //User newUser = new User(firstName, lastName, email,password);
                using (MileageTrackerContext context = new MileageTrackerContext())
                {
                    string hashedPassword = HashPassword.ConvertPasswordToHashedString(user.Password);
                    user.Password = hashedPassword;
                    context.Users.Add(user);
                    context.SaveChanges();
                    //User fullUserInfo = HelperUserMethods.ReturnNewUserWithId(user);
                    //return fullUserInfo.Email;
                }
            }
            else
            {
                //return "User email already exists";
                //need to include some exception handling here 
                throw new Exception("A user with this email already exists");
            }

        }

        // PUT api/user/id
        [HttpPut("{id}")]
        public void UpdateUser(User user)
        {
            User result = null;

            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                try
                {
                    result = context.Users.Where(x => x.UserId == user.UserId).First();
                    result.FirstName = user.FirstName;
                    result.LastName = user.LastName ;
                    bool doesEmailExist = HelperUserMethods.CheckIfUserEmailExists(user.Email);
                    if (doesEmailExist == false)
                    {
                        result.Email = user.Email;
                    }
                    else if(doesEmailExist == true && result.Email != user.Email)
                    {
                        throw new Exception("A user with this email already exists in the database");
                    }
                    bool doPasswordsMatch = HashPassword.CompareHashedPasswords(result.Email,user.Password);
                    if (doPasswordsMatch == false)
                    {
                        string hashedPassword = HashPassword.ConvertPasswordToHashedString(user.Password);
                        result.Password = hashedPassword;
                    }
                    
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
