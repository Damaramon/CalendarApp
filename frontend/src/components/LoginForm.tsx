import { useState } from 'react';
import { authService } from '../api/authService';

interface LoginFormProps {
    onSuccess: () => void;
    onToggleMode: () => void;
}

export const LoginForm = ({ onSuccess, onToggleMode }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login({ email, password });
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <p style={styles.toggleText}>
                    Don't have an account?{' '}
                    <span onClick={onToggleMode} style={styles.toggleLink}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
    },
    card: {
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        padding: '10px 12px',
        fontSize: '14px',
        border: '1px solid #d0d0d0',
        borderRadius: '4px',
        outline: 'none',
    },
    button: {
        padding: '12px',
        fontSize: '14px',
        fontWeight: '500',
        color: 'white',
        background: '#2563eb',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '8px',
    },
    error: {
        padding: '10px',
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderRadius: '4px',
        fontSize: '14px',
    },
    toggleText: {
        textAlign: 'center',
        marginTop: '16px',
        color: '#666',
        fontSize: '14px',
    },
    toggleLink: {
        color: '#2563eb',
        fontWeight: '500',
        cursor: 'pointer',
    },
};
