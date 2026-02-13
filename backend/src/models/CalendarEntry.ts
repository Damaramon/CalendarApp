import mongoose, { Document, Schema } from 'mongoose';

export interface ICalendarEntry extends Document {
    email: string;
    date: Date;
    description: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const calendarEntrySchema = new Schema<ICalendarEntry>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const CalendarEntry = mongoose.model<ICalendarEntry>('CalendarEntry', calendarEntrySchema);
