import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d',
        });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        user.loginHistory.push(new Date());
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d',
        });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId);
        if (user) {
            user.logoutHistory.push(new Date());
            await user.save();
        }

        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
