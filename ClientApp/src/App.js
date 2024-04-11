import React, { useState } from 'react';
import { useEffect } from 'react';
import AppointmentList from './components/AppointmentList';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
    const [user, setUser] = useState(null); 
    const [showLogin, setShowLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 


    useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn])

    const handleLogin = (userDetails) => {
        console.log(userDetails);
        setUser(userDetails);
        setIsLoggedIn(true);
        console.log("isLoggedIn", isLoggedIn)
    };
    const handleRegister = (userDetails) => {
        console.log(userDetails);

        console.log(userDetails); 
        
        setUser(userDetails);
        setIsLoggedIn(true);
        console.log("isLoggedIn", isLoggedIn)

    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };


    return (
        <div className="App">
            {!isLoggedIn ? (
                <>
                    <header>
                        <button onClick={() => setShowLogin(!showLogin)}>
                            {showLogin ? 'Need to register?' : 'Already registered?'}
                        </button>
                    </header>
                    {showLogin ? (
                        <LoginForm onLogin={handleLogin} />
                    ) : (
                            <RegistrationForm onRegister={handleRegister} />
                    )}
                </>
            ) : (
                <>
                    <header>
                        <h1>Dog Grooming Management System</h1>
                        <button onClick={handleLogout}>Logout</button>
                    </header>
                    <AppointmentList user={user} />
                </>
            )}
        </div>
    );
}

export default App;
