using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Domain.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<int> CreateAppointment(AppointmentCreateDto appointment);
        Task<bool> UpdateAppointment(AppointmentUpdateDto appointment);

        Task<Appointment> GetAppointmentById(int id);
        Task<bool> DeleteAppointment(int id);
        Task<IEnumerable<Appointment>> GetAllAppointments();
    }
}
