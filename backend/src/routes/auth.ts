import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const router = Router();

// Validation helper
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedName = name.trim();
    const normalizedPassword = password.trim();

    if (!validateEmail(normalizedEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Formato de email inválido' 
      });
    }

    if (!validatePassword(normalizedPassword)) {
      return res.status(400).json({ 
        success: false, 
        message: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    if (normalizedName.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'El nombre debe tener al menos 2 caracteres' 
      });
    }

    // Check if user already exists
    if (db.users.find(u => u.email === normalizedEmail)) {
      return res.status(409).json({ 
        success: false, 
        message: 'Este email ya está registrado' 
      });
    }

    // Hash password
    const hash = await bcrypt.hash(normalizedPassword, 12);
    
    // Create user
    const newUser = {
      id: Date.now().toString(),
      name: normalizedName,
      email: normalizedEmail,
      hash,
      role,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);

    // Generate token
    const token = jwt.sign(
      { 
        sub: newUser.id, 
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }, 
      process.env.JWT_SECRET || 'ai-platform-secret-key', 
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email y contraseña son requeridos' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = db.users.find(u => u.email === normalizedEmail);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales incorrectas' 
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales incorrectas' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        sub: user.id, 
        email: user.email,
        name: user.name,
        role: user.role
      }, 
      process.env.JWT_SECRET || 'ai-platform-secret-key', 
      { expiresIn: '24h' }
    );

    res.json({ 
      success: true, 
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// Profile endpoint (protected)
router.get('/profile', (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'No autorizado' 
    });
  }

  res.json({ 
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ 
    success: true, 
    message: 'Sesión cerrada exitosamente' 
  });
});

export default router;