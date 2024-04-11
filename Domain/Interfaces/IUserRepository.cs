using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Register(UserRegistrationDto userRegistration);
        Task<User> Login(UserLoginDto userLogin);
    }
}
