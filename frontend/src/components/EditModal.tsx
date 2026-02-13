import { useState, useEffect } from 'react';
import { CalendarEntry, UpdateEntryData } from '../api/calendarService';

interface EditModalProps {
    entry: CalendarEntry;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateEntryData) => Promise<void>;
}

export const EditModal = ({ entry, onClose, onSubmit }: EditModalProps) => {
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setEmail(entry.email);
        setDate(entry.date.split('T')[0]);
        setDescription(entry.description);
    }, [entry]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSubmit(entry._id, { email, date, description });
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update entry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerBox}>Edit Entry</div>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.inputWrapper}>
                            <div style={styles.labelBox}>Email</div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.inputWrapper}>
                            <div style={styles.labelBox}>Date</div>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.descriptionWrapper}>
                        <div style={styles.labelBox}>Description</div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={styles.textarea}
                            rows={6}
                            required
                        />
                    </div>

                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.buttonContainer}>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.submitButton} disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        background: 'white',
        borderRadius: '24px',
        padding: '32px',
        width: '90%',
        maxWidth: '700px',
        border: '2px solid #333',
    },
    header: {
        marginBottom: '24px',
    },
    headerBox: {
        display: 'inline-block',
        padding: '8px 24px',
        border: '2px solid #333',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '500',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    labelBox: {
        padding: '8px 16px',
        border: '2px solid #333',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
    },
    input: {
        padding: '12px 16px',
        fontSize: '14px',
        border: '2px solid #333',
        borderRadius: '8px',
        outline: 'none',
    },
    descriptionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    textarea: {
        padding: '12px 16px',
        fontSize: '14px',
        border: '2px solid #333',
        borderRadius: '8px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '12px',
    },
    cancelButton: {
        padding: '12px 32px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#666',
        background: '#f5f5f5',
        border: '2px solid #d0d0d0',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '12px 48px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    error: {
        padding: '10px',
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderRadius: '4px',
        fontSize: '14px',
    },
};
