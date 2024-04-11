import React, { useState, useEffect } from 'react';
import AppointmentPopup from './AppointmentPopup';
import AppointmentForm from './AppointmentForm';
import AppointmentService from '../services/AppointmentService';
import '../styles/AppointmentStyles.css';

const AppointmentList = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);
    const formatDateAndTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return `${date.toLocaleDateString('en-US', dateOptions)} - ${date.toLocaleTimeString('en-US', timeOptions)}`;
    };

    const fetchAppointments = async () => {
        try {
            const appointments = await AppointmentService.fetchAppointments();
            setAppointments(appointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            alert("Failed to fetch appointments.");
        }
    };

    const handleAddAppointment = async (appointment) => {
        try {
            appointment.userId = user.id
            console.log(appointment)
            await AppointmentService.createAppointment(appointment);
            fetchAppointments(); 
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Failed to add appointment.");
        }
    };

    const handleDelete = async (appointmentId, userId) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            try {
                await AppointmentService.deleteAppointment(appointmentId,userId);
                fetchAppointments();
            } catch (error) {
                console.error("Error deleting appointment:", error);
                alert("Failed to delete appointment.");
            }
        }
    };

    const updateAppointment = async (appointmentId, updatedFields) => {
        try {
            await AppointmentService.updateAppointment(appointmentId, updatedFields);
            fetchAppointments(); 
        } catch (error) {
            console.error("Error updating appointment:", error);
            alert("Failed to update appointment.");
        }
    };

    const clearFilters = () => {
        setNameFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
    };

    const filteredAppointments = appointments.filter(appointment => {
        const lowerCasedName = appointment.userName.toLowerCase();
        const nameMatches = lowerCasedName.includes(nameFilter.toLowerCase());
        const dateMatches = (!startDateFilter || appointment.arrivalTime >= startDateFilter) &&
            (!endDateFilter || appointment.arrivalTime <= endDateFilter);
        return nameMatches && dateMatches;
    });

    const handleSelectAppointment = (appointment) => {
        setSelectedAppointment(appointment);
    };
    const toggleEditMode = ( appointmentId) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, isEditing: !appointment.isEditing } : appointment
        ));
    };

    return (
        <div className="appointment-list-container">
            <h2>Appointment List</h2>
            <div className="filter-container">
                <div className="filter-item">
                    <label htmlFor="nameFilter" className="filter-label">Filter by Name:</label>
                    <input type="text" id="nameFilter" className="filter-input" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                </div>
                <div className="filter-item">
                    <label htmlFor="startDateFilter" className="filter-label">Filter by Start Date:</label>
                    <input type="date" id="startDateFilter" className="filter-input" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} required />
                </div>
                <div className="filter-item">
                    <label htmlFor="endDateFilter" className="filter-label">Filter by End Date:</label>
                    <input type="date" id="endDateFilter" className="filter-input" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} required />
                </div>
                <button onClick={clearFilters} className="filter-clear-button">Clear Filters</button>
            </div>
            <AppointmentForm onSave={handleAddAppointment} user={user} />
            {filteredAppointments.length > 0 ? (
                <ul className="appointment-list">
                    {filteredAppointments.map(appointment => (
                        <li key={appointment.id} className="appointment-list-item">
                            <div onClick={() => handleSelectAppointment(appointment)}>
                                {`${appointment.userName}, ${formatDateAndTime(appointment.arrivalTime)}`}
                            </div>
                            {appointment.isEditing ? (
                                <AppointmentForm appointment={appointment} onSave={(updatedFields) => updateAppointment(appointment.id, updatedFields)} user={user} />
                            ) : appointment.userId === user.id && (
                                <div className="appointment-actions">
                                    <button className="appointment-list-button" onClick={() => toggleEditMode(appointment.id)}>Edit</button>
                                        <button className="appointment-list-button delete-button" onClick={() => handleDelete(appointment.id, appointment.userId)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments match your filters.</p>
            )}
            {selectedAppointment && <AppointmentPopup appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}
        </div>
    );

};

export default AppointmentList;
