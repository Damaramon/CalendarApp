import { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { CalendarList } from './components/CalendarList';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    if (isAuthenticated) {
        return <CalendarList onLogout={handleLogout} />;
    }

    return showLogin ? (
        <LoginForm onSuccess={handleAuthSuccess} onToggleMode={() => setShowLogin(false)} />
    ) : (
        <RegisterForm onSuccess={handleAuthSuccess} onToggleMode={() => setShowLogin(true)} />
    );
}

export default App;
