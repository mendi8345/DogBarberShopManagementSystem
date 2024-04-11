
import axios from 'axios';

const API_URL = 'https://localhost:5001/auth/'; // Update with the actual URL of your backend

const register = (userName, password, FirstName) => {
    return axios.post(API_URL + 'register', {
        userName,
        password,
        FirstName
    }).then((response) => {
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const login = (userName, password) => {
    return axios.post(API_URL + 'login', {
        userName,
        password
    }).then((response) => {
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    register,
    login,
    logout
};
