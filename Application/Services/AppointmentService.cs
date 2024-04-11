using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Domain.Interfaces;
using DogBarberShopManagementSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Application.Services
{


    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public async Task<int> CreateAppointment(AppointmentCreateDto appointment)
        {
            return await _appointmentRepository.CreateAppointment(appointment);
        }

       

        public async Task<IEnumerable<Appointment>> GetAllAppointments()
        {
            return await _appointmentRepository.GetAllAppointments();

        }

        public async Task<Appointment> GetAppointmentById(int id)
        {
            return await _appointmentRepository.GetAppointmentById(id);

        }

        public async Task<bool> UpdateAppointment(AppointmentUpdateDto appointmentDto)
        {
            var existingAppointment = await _appointmentRepository.GetAppointmentById(appointmentDto.Id);
            if (existingAppointment.UserId == appointmentDto.UserId)
            {
                return await _appointmentRepository.UpdateAppointment(appointmentDto);
            }
            else
            {
                throw new UnauthorizedAccessException("User does not have permission to update this appointment.");
            }
        }

        public async Task<bool> DeleteAppointment(int appointmentId, int currentUserId)
        {
            var existingAppointment = await _appointmentRepository.GetAppointmentById(appointmentId);
            if (existingAppointment.UserId == currentUserId)
            {
                return await _appointmentRepository.DeleteAppointment(appointmentId);
            }
            else
            {
                throw new UnauthorizedAccessException("User does not have permission to delete this appointment.");
            }
        }


    }
}
