using System;


namespace DogBarberShopManagementSystem.Domain.DTOs
{
    public class AppointmentUpdateDto
    {
        public int Id { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int UserId { get; set; }
    }

}
