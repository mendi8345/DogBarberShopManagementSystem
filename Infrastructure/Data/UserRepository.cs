using Dapper;
using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Domain.Interfaces;
using DogBarberShopManagementSystem.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Infrastructure.Data
{
    public class UserRepository :BaseRepository, IUserRepository
    {
        private readonly IDbConnection connection;

        public UserRepository(IConfiguration configuration)
            : base(configuration) { }

        public async Task<User> Register(UserRegistrationDto userRegistration)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", userRegistration.UserName);
            parameters.Add("@Password", userRegistration.Password); 
            parameters.Add("@FirstName", userRegistration.Password);
            using (var connection = CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>(
                "spRegisterUser",
                parameters,
                commandType: CommandType.StoredProcedure
            );
            }
        }

        public async Task<User> Login(UserLoginDto userLogin)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", userLogin.UserName);
            parameters.Add("@Password", userLogin.Password);
            using (var connection = CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>(
                "spLoginUser",
                parameters,
                commandType: CommandType.StoredProcedure
            );
            }
        }
    }
}
