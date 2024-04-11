import React, { useState, useEffect } from 'react';
import AppointmentPopup from './AppointmentPopup';
import AppointmentForm from './AppointmentForm';
import '../styles/AppointmentStyles.css';
import AppointmentService from '../services/AppointmentService';


const initialAppointments = [
    { id: 1, name: "Charlie", arrivalTime: "10:00 AM", appointmentCreated: "April 3, 2024" },
    { id: 2, name: "Max", arrivalTime: "11:00 AM", appointmentCreated: "April 4, 2024" },
  
];

const AppointmentList = ({ user}) => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const appointments = await AppointmentService.fetchAppointments();
                setAppointments(appointments);
            } catch (error) {
                console.error("Error loading appointments:", error);
            }
        };

        loadAppointments();
    }, []);

    const handleDelete = (appointmentId) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
        }
    };


    const handleSelectAppointment = (appointment) => {
        setSelectedAppointment(appointment);
    };
    const toggleEditMode = (appointmentId) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, isEditing: !appointment.isEditing } : appointment
        ));
    };

    const handleAddAppointment = (appointment) => {
        console.log(appointment)
        const newId = appointments.length > 0 ? Math.max(...appointments.map(c => c.id)) + 1 : 1; 
        setAppointments([...appointments, { ...appointment,name:appointment.name, id: newId }]);
    };

    const updateAppointment = (appointmentId, updatedFields) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, ...updatedFields, isEditing: false } : appointment
        ));
    };

    const clearFilters = () => {
        setNameFilter('');
        setDateFilter('');
    };

    const filteredAppointments = appointments.filter(appointment => {
        console.log(appointment)
        return appointment.userName.toLowerCase().includes(nameFilter.toLowerCase()) &&
            appointment.appointmentCreated.includes(dateFilter);
    });

    return (
        <div className="appointment-list-container">
            <h2>Appointment List</h2>
            <div className="filter-container">
                <label htmlFor="nameFilter" className="filter-label">Filter by Name:</label>
                <input
                    type="text"
                    id="nameFilter"
                    className="filter-input"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
              
                <label htmlFor="dateFilter" className="filter-label">Filter by Date:</label>
                <input
                    type="date"
                    id="dateFilter"
                    className="filter-input"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    required
                />
                <button onClick={clearFilters} className="filter-clear-button">Clear Filters</button>
            </div>

            <AppointmentForm onSave={handleAddAppointment} user={ user}/>
            <ul className="appointment-list">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(appointment => (
                        <li key={appointment.id} className="appointment-list-item"
                            onClick={() => handleSelectAppointment(appointment)}>
                            {appointment.isEditing ? (
                                <AppointmentForm appointment={appointment} onSave={(updatedFields) => updateAppointment(appointment.id, updatedFields)} />
                            ) : (
                                <>
                                        {appointment.name} - {appointment.arrivalTime}
                                        <div>
                                        <button className="appointment-list-button" onClick={() => toggleEditMode(appointment.id)}>Edit</button>
                                            <button className="appointment-list-button delete-button" onClick={() => handleDelete(appointment.id)}>Delete</button>
                                        </div>

                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li>No appointments match your filters.</li>
                )}
            </ul>
            {selectedAppointment && (
                <AppointmentPopup
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                />
            )}
        </div>
    );
};

export default AppointmentList;
