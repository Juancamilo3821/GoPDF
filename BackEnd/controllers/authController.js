import jwt from 'jsonwebtoken';
import config from '../config.js';
import bcrypt from 'bcrypt';

const UsersDB = [
  {
    email: 'test@gmail.com',
    passwordHash: '$2a$10$qYI4e.NIB2PdxdZu2nLKM.w0e8E035aoX843WbHlsgUdqq2ytU.6W', //123456
  }
];

export async function login(req, res) {
  const { email, password } = req.body;

  const user = UsersDB.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  console.log("Sesión Iniciada")

  const token = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
}


export async function register(req, res) {
  const { email, password, firstname, lastname } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Usuario Registrado:", {email,firstname,lastname,passwordHash: hashedPassword,});

    const token = jwt.sign({ email}, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
