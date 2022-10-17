using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mileageTrackerBackend.Models
{
    public static class HelperUserMethods
    {
        public static bool CheckIfUserEmailExists(string email)
        {
            User user = null;
            using (MileageTrackerContext context = new MileageTrackerContext())
            {
                try
                {
                    user = context.Users.Where(x => x.Email == email).First();
                    return true;
                }
                catch (Exception)
                {

                    return false;
                }
            }
        }
    }
}
