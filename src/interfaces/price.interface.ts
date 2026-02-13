import { CurrencyEnum } from "../enums/currency.enum";

export interface IPrice {
    [CurrencyEnum.UAH]: number;
    [CurrencyEnum.USD]: number;
    [CurrencyEnum.EUR]: number;

    originalCurrency: CurrencyEnum;
    originalPrice: number;
}
