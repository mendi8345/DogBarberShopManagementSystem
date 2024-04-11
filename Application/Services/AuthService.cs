using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Domain.Interfaces;
using DogBarberShopManagementSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Application.Services
{
    

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Register(UserRegistrationDto userRegistration)
        {
            return await _userRepository.Register(userRegistration);
        }

        public async Task<User> Login(UserLoginDto userLogin)
        {
            return await _userRepository.Login(userLogin);
        }
    }
}
