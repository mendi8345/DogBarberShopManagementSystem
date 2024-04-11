using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Domain.DTOs
{
    public class UserRegistrationDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        // Additional user-related properties, like Email, etc.
    }
}
