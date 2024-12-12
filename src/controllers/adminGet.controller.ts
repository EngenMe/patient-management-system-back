import { Request, Response, NextFunction } from 'express';
import Admin from '../models/admin.model';

export const getAdminIdByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        res.status(400).json({
            status: 'error',
            message: 'Email query parameter is required and must be a valid string.',
        });
        return;
    }

    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            res.status(404).json({
                status: 'error',
                message: 'Admin not found.',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Admin ID retrieved successfully.',
            data: { adminId: admin.id },
        });
    } catch (error) {
        console.error('Error fetching admin ID by email:', error);
        next(error);
    }
};
