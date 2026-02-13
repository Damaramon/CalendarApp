import { Response } from 'express';
import { CalendarEntry } from '../models/CalendarEntry';
import { AuthRequest } from '../middleware/auth';
import { sendCalendarEmail } from '../services/emailService';

export const createEntry = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, date, description } = req.body;

        const entry = await CalendarEntry.create({
            email,
            date: new Date(date),
            description,
            userId: req.userId,
        });

        await sendCalendarEmail({
            email,
            date,
            description,
        });

        res.status(201).json({
            message: 'Entry created successfully',
            entry,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getEntries = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const entries = await CalendarEntry.find({ userId: req.userId }).sort({ date: -1 });
        res.json({ entries });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateEntry = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { email, date, description } = req.body;

        const entry = await CalendarEntry.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { email, date: new Date(date), description },
            { new: true }
        );

        if (!entry) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }

        res.json({ message: 'Entry updated successfully', entry });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteEntry = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const entry = await CalendarEntry.findOneAndDelete({ _id: id, userId: req.userId });

        if (!entry) {
            res.status(404).json({ message: 'Entry not found' });
            return;
        }

        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
