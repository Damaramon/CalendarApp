import { useState, useEffect } from 'react';
import { calendarService, CalendarEntry, CreateEntryData, UpdateEntryData } from '../api/calendarService';
import { authService } from '../api/authService';
import { CreateModal } from './CreateModal';
import { EditModal } from './EditModal';

interface CalendarListProps {
    onLogout: () => void;
}

export const CalendarList = ({ onLogout }: CalendarListProps) => {
    const [entries, setEntries] = useState<CalendarEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState<CalendarEntry | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const loadEntries = async () => {
        try {
            const data = await calendarService.getEntries();
            setEntries(data);
        } catch (error) {
            console.error('Failed to load entries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleCreate = async (data: CreateEntryData) => {
        await calendarService.createEntry(data);
        await loadEntries();
    };

    const handleUpdate = async (id: string, data: UpdateEntryData) => {
        await calendarService.updateEntry(id, data);
        await loadEntries();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            await calendarService.deleteEntry(id);
            await loadEntries();
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            onLogout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const getEntriesForDate = (day: number | null) => {
        if (!day) return [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return entries.filter(entry => {
            const entryDate = new Date(entry.date);
            const entryDateStr = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, '0')}-${String(entryDate.getDate()).padStart(2, '0')}`;
            return entryDateStr === dateStr;
        });
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loading}>Loading...</div>
            </div>
        );
    }

    const days = getDaysInMonth(currentDate);

    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <div style={styles.calendarSection}>
                    <div style={styles.calendarHeader}>
                        <h1 style={styles.title}>Big Calendar</h1>
                        <div style={styles.monthNav}>
                            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} style={styles.navButton}>
                                &lt;
                            </button>
                            <span style={styles.monthYear}>
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} style={styles.navButton}>
                                &gt;
                            </button>
                        </div>
                    </div>

                    <div style={styles.calendar}>
                        <div style={styles.weekDaysRow}>
                            {weekDays.map(day => (
                                <div key={day} style={styles.weekDay}>{day}</div>
                            ))}
                        </div>
                        <div style={styles.daysGrid}>
                            {days.map((day, index) => {
                                const dayEntries = getEntriesForDate(day);
                                return (
                                    <div key={index} style={day ? styles.dayCell : styles.emptyCell}>
                                        {day && (
                                            <>
                                                <div style={styles.dayNumber}>{day}</div>
                                                <div style={styles.dayEntries}>
                                                    {dayEntries.map(entry => (
                                                        <div
                                                            key={entry._id}
                                                            style={styles.entryBadge}
                                                            onClick={() => setEditingEntry(entry)}
                                                            title={`${entry.email} - ${entry.description}`}
                                                        >
                                                            {entry.email}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div style={styles.sidebar}>
                    <button onClick={() => setShowCreateModal(true)} style={styles.createButton}>
                        Create
                    </button>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.listSection}>
                <h2 style={styles.listTitle}>All Entries</h2>
                {entries.length === 0 ? (
                    <div style={styles.emptyState}>No entries yet</div>
                ) : (
                    <div style={styles.emailList}>
                        {entries.map((entry) => (
                            <div key={entry._id} style={styles.emailItem}>
                                <div style={styles.emailInfo}>
                                    <div style={styles.emailText}>{entry.email}</div>
                                    <div style={styles.dateText}>{new Date(entry.date).toLocaleDateString()}</div>
                                </div>
                                <div style={styles.actions}>
                                    <button onClick={() => setEditingEntry(entry)} style={styles.editButton}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(entry._id)} style={styles.deleteButton}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showCreateModal && (
                <CreateModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreate} />
            )}

            {editingEntry && (
                <EditModal
                    entry={editingEntry}
                    onClose={() => setEditingEntry(null)}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    loading: {
        fontSize: '16px',
        color: '#666',
    },
    mainContent: {
        display: 'flex',
        gap: '20px',
        marginBottom: '32px',
    },
    calendarSection: {
        flex: 1,
        background: 'white',
        border: '2px solid #333',
        borderRadius: '16px',
        padding: '24px',
    },
    calendarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
    },
    monthNav: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    navButton: {
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: '600',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    monthYear: {
        fontSize: '16px',
        fontWeight: '600',
        minWidth: '150px',
        textAlign: 'center',
    },
    calendar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    weekDaysRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px',
    },
    weekDay: {
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '600',
        color: '#666',
        padding: '8px',
    },
    daysGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
    },
    dayCell: {
        minHeight: '100px',
        padding: '8px',
        background: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
    },
    emptyCell: {
        minHeight: '100px',
        background: '#fafafa',
    },
    dayNumber: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '4px',
    },
    dayEntries: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        overflow: 'auto',
    },
    entryBadge: {
        fontSize: '11px',
        padding: '4px 6px',
        background: '#2563eb',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    createButton: {
        padding: '12px 32px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '8px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    logoutButton: {
        padding: '12px 32px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#666',
        background: '#f5f5f5',
        border: '2px solid #d0d0d0',
        borderRadius: '8px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    listSection: {
        background: 'white',
        border: '2px solid #333',
        borderRadius: '16px',
        padding: '24px',
    },
    listTitle: {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '16px',
        color: '#333',
    },
    emptyState: {
        textAlign: 'center',
        padding: '32px',
        color: '#666',
    },
    emailList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    emailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        background: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
    },
    emailInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    emailText: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '500',
    },
    dateText: {
        fontSize: '12px',
        color: '#666',
    },
    actions: {
        display: 'flex',
        gap: '8px',
    },
    editButton: {
        padding: '8px 20px',
        fontSize: '13px',
        fontWeight: '500',
        color: '#333',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '8px 20px',
        fontSize: '13px',
        fontWeight: '500',
        color: '#dc2626',
        background: '#fee2e2',
        border: '2px solid #dc2626',
        borderRadius: '6px',
        cursor: 'pointer',
    },
};
