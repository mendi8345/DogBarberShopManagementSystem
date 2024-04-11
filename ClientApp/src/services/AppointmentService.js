import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api/appointments';

const fetchAppointments = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch appointments:", error);
        throw error;
    }
};

const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(API_BASE_URL, appointmentData);
        alert('Appointment created successfully!');
        return response.data;
    } catch (error) {
        console.error("Failed to create appointment:", error);
        throw error;
    }
};

const updateAppointment = async (id, appointmentData, userId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, appointmentData);
        alert('Appointment updated successfully!');
        return response.data;
    } catch (error) {
        console.error("Failed to update appointment:", error);
        throw error;
    }
};

const deleteAppointment = async (id, userId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}?userId=${userId}`);
        alert('Appointment deleted successfully!');
    } catch (error) {
        console.error("Failed to delete appointment:", error);
        throw error;
    }
};

export default {
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
