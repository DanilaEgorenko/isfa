export function formatNumber(num: string): string {
    if (+num >= 1e12) {
        return (+num / 1e12).toFixed(2).replace(".", ",") + "трлд";
    }
    if (+num >= 1e9) {
        return (+num / 1e9).toFixed(2).replace(".", ",") + "млрд";
    }
    if (+num >= 1e6) {
        return (+num / 1e6).toFixed(2).replace(".", ",") + "млн";
    }

    return `${num}`;
}
