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
    public class AppointmentRepository : BaseRepository, IAppointmentRepository
    {
        public AppointmentRepository(IConfiguration configuration)
            : base(configuration) { }

        public async Task<int> CreateAppointment(AppointmentCreateDto appointment)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", appointment.UserId);
            parameters.Add("@ArrivalTime", appointment.ArrivalTime);
            parameters.Add("@AppointmentCreated", DateTime.UtcNow);
            using (var connection = CreateConnection())
            {

                var id = await connection.QuerySingleAsync<int>("CreateAppointment", parameters, commandType: CommandType.StoredProcedure);

                return id;
            }
        }
        public async Task<IEnumerable<Appointment>> GetAllAppointments()
        {
            using (var connection = CreateConnection())
            {
                var appointments = await connection.QueryAsync<Appointment>(
                "GetAppointments",
                commandType: CommandType.StoredProcedure
            );

                return appointments;
            }
        }

        public async Task<bool> UpdateAppointment(AppointmentUpdateDto appointment)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", appointment.Id);
                parameters.Add("@ArrivalTime", appointment.ArrivalTime);
                using (var connection = CreateConnection())
                {
                    var affectedRows = await connection.ExecuteAsync(
                    "UpdateAppointment",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                    return affectedRows > 0;
                }
            }

            catch (Exception ex)
            {

                throw;
            }
        }
    

    public async Task<bool> DeleteAppointment(int id)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@Id", id);
            using (var connection = CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync(
            "DeleteAppointment",
            parameters,
            commandType: CommandType.StoredProcedure
        );

                return affectedRows > 0;
            }
    }

    public async Task<Appointment> GetAppointmentById(int id)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@Id", id);

        using (var connection = CreateConnection())
        {
            return await connection.QuerySingleOrDefaultAsync<Appointment>(
                "GetAppointmentById",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
    }



}
}
