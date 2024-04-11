using Dapper;
using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Domain.Interfaces;
using DogBarberShopManagementSystem.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Infrastructure.Data
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;

        protected BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DogBarberShop");
        }

        protected IDbConnection CreateConnection()
        {
            return new SqlConnection(_connectionString); 
        }
    }
}

    

