import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import '../styles/FormStyles.css';


const LoginForm = ({ onLogin }) => {
    const [userInput, setUserInput] = useState({
        userName: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.userName = userInput.userName ? "" : "Username is required.";
        tempErrors.password = userInput.password ? "" : "Password is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const user = await AuthService.login(userInput.userName, userInput.password);
                onLogin(user);
            } catch (error) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    global: error.message || 'Failed to login.'
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
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            id="userName"
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
                    <button type="submit" className="form-button">Login</button>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
