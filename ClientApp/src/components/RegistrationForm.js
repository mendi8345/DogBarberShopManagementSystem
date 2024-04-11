import React, { useState } from 'react';
import AuthService from '../services/AuthService';

import '../styles/FormStyles.css';


const RegistrationForm = ({ onRegister}) => {
    const [userInput, setUserInput] = useState({
        userName: '',
        password: '',
        firstName: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.userName = userInput.userName ? "" : "Username is required.";
        tempErrors.password = userInput.password ? "" : "Password is required.";
        tempErrors.firstName = userInput.firstName ? "" : "First name is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const user = await AuthService.register(userInput.userName, userInput.password, userInput.firstName);
                console.log("registered user: ", user)
                onRegister(user);
            } catch (error) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    global: error.message || 'Failed to register.'
                }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-input"
                            name="firstName"
                            value={userInput.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p>{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            id="userName"
                            className="form-input"
                            name="userName"
                            value={userInput.userName}
                            onChange={handleChange}
                        />
                        {errors.userName && <p>{errors.userName}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            name="password"
                            value={userInput.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit" className="form-button">Register</button>
                </form>
            </div>
        </div>

    );
};

export default RegistrationForm;
