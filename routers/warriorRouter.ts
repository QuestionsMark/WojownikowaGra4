import { Request, Response, Router } from "express";
import { Arena } from "../game/arena";
import { Warrior } from "../game/warrior";

import { WarriorRecord } from '../records/warrior';

export const warriorRouter = Router();

warriorRouter
    .get('/add', (req: Request, res: Response): void => {
        res.render('warrior/form');
    })
    .post('/add', async (req: Request, res: Response): Promise<void> => {
        const { name, power, defence, vitality, agility } = req.body;
        try {
            await WarriorRecord.create({
                id: null,
                name,
                agility,
                defence,
                power,
                vitality,
            });
            res.status(201).send();
        } catch (e) {
            console.error(e);
            res.status(500).send()
        }
    })
    .get('/hall-of-fame', async (req: Request, res: Response): Promise<void> => {
        const warriors = await WarriorRecord.getFame();

        res.render('warrior/hall-of-fame', {
            warriors
        });
    })
    .get('/fight/:warrior1Id/:warrior2Id', async (req: Request, res: Response): Promise<void> => {
        const { warrior1Id, warrior2Id } = req.params;
        const warrior1 = await WarriorRecord.findOne(warrior1Id);
        const warrior2 = await WarriorRecord.findOne(warrior2Id);
        const results = Arena.fight(new Warrior(warrior1), new Warrior(warrior2));
        WarriorRecord.incFights(warrior1.id);
        WarriorRecord.incFights(warrior2.id);
        WarriorRecord.incWins(results.winner.id);
        res.json(results);
    })