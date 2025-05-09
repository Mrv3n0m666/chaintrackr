import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Unhandled error:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.errors[0].message });
  }

  return res.status(500).json({ error: 'Internal server error' });
};
