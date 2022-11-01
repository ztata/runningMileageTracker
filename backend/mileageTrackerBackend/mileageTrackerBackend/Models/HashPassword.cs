using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace mileageTrackerBackend.Models
{
    public static class HashPassword
    {
        public static string ConvertPasswordToHashedString(string password)
        {
            //creating salt value
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            //getting hash value
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            //combine salt and password bytes
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            //turn the combined salt and hash into a string for storage
            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            //return the hashed and salted string
            return savedPasswordHash;

        }

        public static bool CompareHashedPasswords(string email, string enteredPassword)
        {
            User user = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                //NEED TO HANDLE EXCEPTION HERE IF THE USER DOES NOT EXIST IN THE DATABASE
                user = context.Users.Where(x => x.Email == email).First();
            }

            if (user != null)
            {
                //retrieve stored value 
                string savedPasswordHash = user.Password;

                //extract the bytes
                byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);

                //get the salt
                byte[] salt = new byte[16];
                Array.Copy(hashBytes, 0, salt, 0, 16);

                //get the hash of the user entered password
                var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 100000);
                byte[] hash = pbkdf2.GetBytes(20);

                //compare the results
                for (int i = 0; i < 20; i++)
                {
                    if (hashBytes[i+16] != hash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
            else
            {
                return false;
            }

        }
    }
}
