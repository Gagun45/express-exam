import { CurrencyEnum } from "../enums/currency.enum";

export interface IPriceInfo {
    originalPrice: number;
    originalCurrency: CurrencyEnum;
    convertedPrices: Record<CurrencyEnum, number>;
    exchangeRates: Record<CurrencyEnum, number>;
}
