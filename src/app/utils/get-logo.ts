import { IItem } from "@app/interfaces";

export function getLogo(item: IItem): string {
    if (!item?.logo) {
        item.logo = item.icon;
    }
    if (item.type === "crypto") return item.logo;
    if (item.logo === "test.png") return null;

    console.log(item);

    return `https://invest-brands.cdn-tinkoff.ru/${
        item.logo.split(".")[0]
    }x160.png`;
}
