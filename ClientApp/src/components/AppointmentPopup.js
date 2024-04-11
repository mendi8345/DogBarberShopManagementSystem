import React from 'react';

const AppointmentPopup = ({ appointment, onClose }) => {
    return (
        <>
            <div className="appointment-popup-backdrop" onClick={onClose}></div>
            <div className="appointment-popup">
                <p>Name: {appointment.name}</p>
                <p>Arrival Time: {appointment.arrivalTime}</p>
                <p>Appointment Created: {appointment.appointmentCreated}</p>
                <button className="appointment-list-button" onClick={onClose}>Close</button>
            </div>
        </>
    );
};

export default AppointmentPopup;
