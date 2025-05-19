// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// console.log(process.env.SECRET_KEY)
// const SECRET_KEY = process.env.SECRET_KEY;


// if (!SECRET_KEY) {
//   throw new Error("SECRET_KEY is not defined in environment variables");
// }

export const authenticateJWT = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token missing!' });
        return;
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const decoded:string |JwtPayload = await jwt.verify(token, "SECRET_KEY");
        
        (req as any).user = decoded;

        console.log(decoded,"de")
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
};
