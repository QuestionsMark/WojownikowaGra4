import { FieldPacket } from "mysql2";
import { pool } from "../utils/db";

type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    id: string | null;
    name: string;
    power: number;
    defence: number;
    vitality: number;
    agility: number;

    constructor(obj: WarriorRecord) {
        this.id = obj.id ?? null;
        this.name = obj.name;
        this.power = obj.power;
        this.defence = obj.defence;
        this.vitality = obj.vitality;
        this.agility = obj.agility;
    }

    public static async find(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warrior` ORDER BY `name`") as WarriorRecordResult;
        return results.map(obj => new WarriorRecord(obj));
    }

    public static async findOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warrior` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResult;
        return results.length === 0 ? null : new WarriorRecord(results[0]);
    }

    public static async getFame(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT `name`, `fights`, `wins` FROM `warrior` ORDER BY `wins` DESC LIMIT 10") as WarriorRecordResult;
        return results;
    }

    public static async create({ name, power, defence, vitality, agility }: WarriorRecord): Promise<void> {
        await pool.execute("INSERT INTO `warrior` (`name`, `power`, `defence`, `vitality`, `agility`) VALUES(:name, :power, :defence, :vitality, :agility)", {
            name,
            power,
            defence,
            vitality,
            agility,
        }) as WarriorRecordResult;
    }

    public static async incFights(id: string): Promise<void> {
        await pool.execute("UPDATE `warrior` SET `fights` = `fights` + 1 WHERE `id` = :id", {
            id
        }) as WarriorRecordResult;
    }

    public static async incWins(id: string): Promise<void> {
        await pool.execute("UPDATE `warrior` SET `wins` = `wins` + 1 WHERE `id` = :id", {
            id
        }) as WarriorRecordResult;
    }
}