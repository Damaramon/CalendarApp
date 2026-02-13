import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    loginHistory: Date[];
    logoutHistory: Date[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        loginHistory: {
            type: [Date],
            default: [],
        },
        logoutHistory: {
            type: [Date],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>('User', userSchema);
