export function calculateBondYield(
    nominal: number,
    nkd: number,
    couponPayment: number,
    couponFrequency: number,
    maturityDateStr: string
) {
    const currentDate = new Date();
    const maturityDate = new Date(maturityDateStr);

    const timeDiff =
        new Date(maturityDate).getTime() - new Date(currentDate).getTime();
    const daysToMaturity = timeDiff / (1000 * 60 * 60 * 24);
    const yearsToMaturity = daysToMaturity / 365;

    const couponsLeft = Math.floor(yearsToMaturity * couponFrequency);

    const totalCoupons = couponsLeft * couponPayment;
    const totalIncome = totalCoupons + nominal - nkd;

    const investment = nominal + nkd;
    const totalIncomePercentage = (totalIncome / investment) * 100 - 100;
    const annualYield = (totalIncomePercentage / daysToMaturity) * 365;

    return {
        totalIncome: totalIncome.toFixed(2),
        totalIncomePercentage: totalIncomePercentage.toFixed(2),
        annualYield: annualYield.toFixed(2),
        daysToMaturity: daysToMaturity.toFixed(0),
        couponsLeft: couponsLeft.toFixed(0),
        totalCoupons: totalCoupons.toFixed(2),
        investment: investment.toFixed(2),
    };
}
