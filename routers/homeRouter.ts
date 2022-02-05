import { Request, Response, Router } from "express";

import { WarriorRecord } from '../records/warrior';

export const homeRouter = Router();

homeRouter
    .get('/', async (req: Request, res: Response): Promise<void> => {
        const warriors = await WarriorRecord.find();
        res.render('arena/arena', {
            warriors,
        });
    });