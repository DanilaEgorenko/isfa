import { EMarketTrand } from "../enums";

export const MARKET_TRAND_CONST: Record<
    EMarketTrand,
    { title: string; color: `var(--${string})` }
> = {
    [EMarketTrand.UP]: {
        title: "Растёт",
        color: "var(--color-green)",
    },
    [EMarketTrand.SIDEWAYS]: {
        title: "Боковой",
        color: "var(--color-gray)",
    },
    [EMarketTrand.UNKNOWN]: {
        title: "Не определён",
        color: "var(--color-black)",
    },
    [EMarketTrand.DOWN]: {
        title: "Падает",
        color: "var(--color-red)",
    },
};
