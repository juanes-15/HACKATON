import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';

interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de autorización requerido' 
      });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Formato de token inválido' 
      });
    }

    // Verify JWT token
    const payload = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'ai-platform-secret-key'
    ) as JWTPayload;

    // Check if user still exists in database
    const user = db.users.find(u => u.id === payload.sub);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    // Add user information to request
    (req as any).user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expirado' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error de autenticación' 
    });
  }
}

// Optional auth middleware (doesn't fail if no token)
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next();
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return next();
    }

    const payload = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'ai-platform-secret-key'
    ) as JWTPayload;

    const user = db.users.find(u => u.id === payload.sub);
    
    if (user) {
      (req as any).user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      };
    }

    next();

  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
}