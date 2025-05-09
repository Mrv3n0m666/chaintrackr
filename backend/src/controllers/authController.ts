// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

// ✅ POST /api/auth/register - Register new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await registerUser(email, password);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// ✅ POST /api/auth/login - Login user and get token
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};
