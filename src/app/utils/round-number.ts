export function roundNumber(num: number, to: number = 3): string {
    if (!num) return;
    return num.toFixed(to);
}
