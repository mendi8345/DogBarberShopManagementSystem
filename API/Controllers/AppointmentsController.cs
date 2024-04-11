using DogBarberShopManagementSystem.Domain.DTOs;
using DogBarberShopManagementSystem.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;

    public AppointmentsController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AppointmentCreateDto appointmentDto)
    {
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdAppointmentId = await _appointmentService.CreateAppointment(appointmentDto);
            return CreatedAtAction(nameof(GetById), new { id = createdAppointmentId });
        }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var appointment = await _appointmentService.GetAppointmentById(id);
        if (appointment == null)
        {
            return NotFound();
        }
        return Ok(appointment);
    }
    [HttpGet()]
    public async Task<IActionResult> Get()
    {
        var appointment = await _appointmentService.GetAllAppointments();
        if (appointment == null)
        {
            return NotFound();
        }
        return Ok(appointment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, AppointmentUpdateDto appointment)
    {
       

        try
        {
            await _appointmentService.UpdateAppointment(appointment);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, [FromQuery] int userId)
    {
        try
        {
            await _appointmentService.DeleteAppointment(id,userId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound();
        }
    }
}

