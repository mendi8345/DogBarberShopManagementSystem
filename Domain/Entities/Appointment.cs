using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogBarberShopManagementSystem.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime AppointmentCreated { get; set; }
        public string UserName { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int UserId { get; set; }
    }
}
