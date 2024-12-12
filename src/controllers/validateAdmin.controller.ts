import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Admin from '../models/admin.model';
import { hashString } from '../helpers/hashString';

export const validateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const hashedPassword = hashString(password);

        const admin = await Admin.findOne({
            where: {
                email: email,
                password: hashedPassword,
            },
        });

        if (!admin) {
            res.status(404).json({
                status: 'error',
                message: 'Admin not found or credentials are incorrect.',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Admin validated successfully.',
        });
    } catch (error) {
        console.error('Error validating patient:', error);
        next(error);
    }
};
