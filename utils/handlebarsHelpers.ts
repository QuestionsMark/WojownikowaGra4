export const handlebarsHelpers = {
    getPercentage: (fights: number, wins: number): string => {
        if (fights === 0) return '0,00%';
        return `${(wins / fights * 100).toFixed(2)}%`;
    }
}