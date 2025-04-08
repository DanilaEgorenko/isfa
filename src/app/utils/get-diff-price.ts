export function getDiffCurrPrice(highPrice: string, currPrice: string): string {
    const formula = +currPrice / (+highPrice / 100);
    if (isNaN(formula)) return "";
    return `(${-Math.round(100 - formula)}%)`;
}
