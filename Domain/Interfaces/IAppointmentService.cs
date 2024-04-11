using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Domain.Interfaces
{
    public interface IAppointmentService
    {
        Task<int> CreateAppointment(AppointmentCreateDto appointment);
        Task<bool> UpdateAppointment(AppointmentUpdateDto appointmentDto);
        Task<Appointment> GetAppointmentById(int id);
        Task<bool> DeleteAppointment(int id, int currentUserId);
        Task<IEnumerable<Appointment>> GetAllAppointments();
    }
}
