import api from './axios';

export interface CalendarEntry {
    _id: string;
    email: string;
    date: string;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEntryData {
    email: string;
    date: string;
    description: string;
}

export interface UpdateEntryData {
    email: string;
    date: string;
    description: string;
}

export const calendarService = {
    getEntries: async (): Promise<CalendarEntry[]> => {
        const response = await api.get<{ entries: CalendarEntry[] }>('/calendar');
        return response.data.entries;
    },

    createEntry: async (data: CreateEntryData): Promise<CalendarEntry> => {
        const response = await api.post<{ entry: CalendarEntry }>('/calendar', data);
        return response.data.entry;
    },

    updateEntry: async (id: string, data: UpdateEntryData): Promise<CalendarEntry> => {
        const response = await api.put<{ entry: CalendarEntry }>(`/calendar/${id}`, data);
        return response.data.entry;
    },

    deleteEntry: async (id: string): Promise<void> => {
        await api.delete(`/calendar/${id}`);
    },
};
