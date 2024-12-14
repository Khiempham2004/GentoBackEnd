import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import gentoModel from '../models/gento.model.js'

export const register = async (req, res) => {
    try {
        const {
            email,
            username,
            password
        } = req.body;

        // Hash passowrd
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new gentoUser
        const newGento = new gentoModel({
            email,
            username,
            password: hashedPassword
        });

        await newGento.save();

        res.status(200).json({ message: "User registered successfully " });
    } catch (error) {
        console.log("Error registering user gento : ", error);
        res.status(500).json({ error: 'gento server register error' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(404).json({ error: "Missing fileds" })
        }
        const gentoExiting = await gentoModel.findOne({ email: email })
        if (!gentoExiting) return res.status(405).json({ message: "acccount does not exist" })

        // Compare passwords
        const truePassword = await bcrypt.compare(password, gentoExiting.password)
        if (!truePassword) return res.status(401).json({ message: "Invalid password. " })

        // Generate JWT Token
        const tokenGento = jwt.sign({ id: gentoExiting._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        // delete gento.password
        // Send success response with token 
        res.status(201).json({ tokenGento })
    } catch (error) {
        console.log(error, "error")
        res.status(400).json({ error })
    }
}