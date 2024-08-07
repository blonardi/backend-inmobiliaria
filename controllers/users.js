import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user-model.js';

// ademas de validar en los Schemas de mongoose, valido aca en backend, (right way = zod)

export const registerUser = async (req, res) => {

	const { fullname, email, password } = req.body;

	// Validaciones
	if (!fullname || !email || !password) {
		return res.status(400).json({ message: 'Todos los campos son obligatorios' });
	}

	// Validar formato de email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ message: 'Formato de email inválido' });
	}

	// Validar longitud del nombre
	if (fullname.length < 5 || fullname.length > 50) {
		return res.status(400).json({ message: 'El nombre debe tener entre 5 y 50 caracteres' });
	}

	// Validar complejidad de la contraseña
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	if (!passwordRegex.test(password)) {
		return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número' });
	}
	try {
		// Verificar si el usuario ya existe	 
		let user = await UserModel.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'El usuario ya existe' });
		}

		// Encriptar la contraseña
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Crear nuevo usuario
		const date = new Date().toISOString()
		const createdUser = await UserModel.create({ fullname, email, password: hashedPassword, date });
		console.log(createdUser)
		//const createdUser = await user.save();

		res.status(201).json({
			_id: createdUser._id,
			fullname: createdUser.fullname,
			email: createdUser.email,
			createdAt: createdUser.date
		})
		//// Crear y enviar el token JWT
		//const payload = { userId: user.id };
		//const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

		//res.status(201).json({ token });
	} catch (error) {
		console.error('Error en el registro:', error);
		res.status(500).json({ message: 'Error en el servidor' });
	}
};

// Función para iniciar sesión
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Verificar si el usuario existe
		let user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Credenciales inválidas' });
		}

		// Verificar la contraseña
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Credenciales inválidas' });
		}

		// Crear y enviar el token JWT
		const payload = { userId: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error en el servidor' });
	}
};

// Función para obtener el perfil del usuario
export const getUserProfile = async (req, res) => {
	try {
		const user = await UserModel.findById(req.user.userId).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error en el servidor' });
	}
};