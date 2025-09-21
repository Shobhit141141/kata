import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { CONSTANTS } from '../config/constants.js';
import logger from '../utils/logger.js';

/**
 * Registers a new user, hashes their password, creates a JWT token,
 * sets cookies for authentication, and returns the created user details.
 * Responds with 400 if the email already exists.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: { username: string; email: string; password: string } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: user.role },
      CONSTANTS.JWT_SECRET,
      { expiresIn: '1d' },
    );

    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
      sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
      domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
    });

    res.cookie(
      'user',
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
      {
        httpOnly: true,
        path: '/',
        secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
        sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
        domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
        maxAge: 24 * 60 * 60 * 1000,
      },
    );

    res.status(201).json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err: any) {
    logger.error('Error occurred during registration:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Checks if a given username is already taken.
 * Returns 409 if username exists, otherwise 200 if available.
 */
export const checkUsername = async (req: Request, res: Response) => {
  try {
    const { username }: { username: string } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    res.status(200).json({ message: 'Username is available' });
  } catch (err: any) {
    logger.error('Error occurred during username check:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Logs in an existing user by validating email and password.
 * Creates a JWT token, sets cookies, and returns user details.
 * Responds with 400 for invalid credentials or non-existent user.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      CONSTANTS.JWT_SECRET,
      { expiresIn: '1d' },
    );

    res.cookie('token', token, {
      httpOnly: true,
      path: '/',
      secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
      sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
      domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie(
      'user',
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      }),
      {
        httpOnly: true,
        path: '/',
        secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
        sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
        domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
      },
    );

    res.status(200).json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err: any) {
    logger.error('Error occurred during login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * Logs out a user by clearing authentication cookies.
 * Always responds with 200 and a logout confirmation message.
 */
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    path: '/',
    secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
    sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
    domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
  });

  res.clearCookie('user', {
    httpOnly: true,
    path: '/',
    secure: CONSTANTS.NODE_ENV === 'dev' ? false : true,
    sameSite: CONSTANTS.NODE_ENV === 'dev' ? 'lax' : 'none',
    domain: CONSTANTS.NODE_ENV === 'dev' ? '' : '.shobhittiwari.me',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Retrieves the currently authenticated user's profile, excluding the password.
 * Responds with 404 if the user does not exist.
 */
export const meRoute = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err: any) {
    logger.error('Error occurred while fetching user data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
