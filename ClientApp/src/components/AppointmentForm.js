
import React, { useState, useEffect } from 'react';
import '../styles/AppointmentStyles.css';

const AppointmentForm = ({ onSave, user, appointment = null }) => {
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    useEffect(() => {
        if (appointment) {
            const [date, time] = appointment.arrivalTime.split('T');
            setArrivalDate(date);
            setArrivalTime(time);
        }
    }, [appointment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true); 
        if (!arrivalDate || !arrivalTime) {
            return;
        }
        const appointmentDateTime = `${arrivalDate}T${arrivalTime}`;
        onSave({
            ...appointment,
            name: user.firstName,
            arrivalTime: appointmentDateTime,
            appointmentCreated: appointment ? appointment.appointmentCreated : new Date().toISOString().split('T')[0],
            userId: user.id
        });
        setArrivalDate('');
        setArrivalTime('');
        setSubmitAttempted(false);
    };

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <input
                    type="date"
                    className="appointment-list-input"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <input
                    type="time"
                    className="appointment-list-input"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="appointment-list-button">
                {appointment ? 'Save Changes' : 'Add Appointment'}
            </button>
        </form>
    );
};

export default AppointmentForm;

