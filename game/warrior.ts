import { WarriorRecord } from "../records/warrior";

export class Warrior {
    public readonly id: string;
    public readonly name: string;
    private _hp: number;
    private _dp: number;
    private _atk: number;
    readonly agility: number;

    constructor(obj: WarriorRecord) {
        this.id = obj.id;
        this.name = obj.name;
        this._hp = obj.vitality * 10;
        this._dp = obj.defence;
        this._atk = obj.power;
        this.agility = obj.agility;
    }

    get hp() {
        return this._hp;
    }

    set hp(hp: number) {
        this._hp = hp;
    }

    get atk() {
        return this._atk;
    }

    get dp() {
        return this._dp;
    }

    brakeShield(pkt: number): void {
        if (pkt > this._dp) {
            this._dp = 0;
        } else {
            this._dp -= pkt;
        }
    }

    takeDamage(pkt: number): void {
        this._hp -= pkt;
    }
}