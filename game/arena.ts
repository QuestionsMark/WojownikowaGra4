import { WarriorRecord } from "../records/warrior";
import { Warrior } from "./warrior";


type Turn = 0 | 1;

type Winner = Warrior | null;

interface Result {
    log: string;
    winner: Winner;
}

export class Arena {

    private static takeATurn(warrior1: Warrior, warrior2: Warrior, turn: Turn): Result {
        const attacker = turn === 0 ? warrior1 : warrior2;
        const attacked = turn === 0 ? warrior2 : warrior1;

        const dodge = Math.round(attacked.agility * 50 / 7);

        if (Math.random() * 100 < dodge) {
            return {
                log: `Wojownik ${attacked.name} zrobił unik.`,
                winner: attacked.hp <= 0 ? attacker : null,
            };
        }

        if (attacked.dp >= attacker.atk) {
            attacked.brakeShield(attacker.atk);
            return {
                log: `Wojownik ${attacked.name} stracił ${attacker.atk} punktów tarczy.`,
                winner: attacked.hp <= 0 ? attacker : null,
            }
        } else {
            attacked.takeDamage(attacker.atk - attacked.dp);
            return {
                log: `Wojownik ${attacked.name} otrzymał ${attacker.atk - attacked.dp} obrażeń.`,
                winner: attacked.hp <= 0 ? attacker : null,
            }
        }

    }

    public static fight(warrior1: Warrior, warrior2: Warrior) {

        let turn: Turn;
        if (warrior1.agility > warrior2.agility) {
            turn = 0;
        } else if (warrior1.agility < warrior2.agility) {
            turn = 1;
        } else {
            turn = Math.floor(Math.random() * 2) as Turn;
        }

        let winner: Winner = null;
        const logs: string[] = [];

        do {
            const result = this.takeATurn(warrior1, warrior2, turn);
            logs.push(result.log);
            winner = result.winner;
            if (winner) {
                return {
                    warriors: [warrior1, warrior2],
                    winner,
                    logs,
                }
            }
            turn = turn === 0 ? 1 : 0;
        } while (!winner);
    }
}