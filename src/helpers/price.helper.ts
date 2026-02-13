import { ExchangeRates } from "../constants/exchange-rates.constants";
import { CurrencyEnum } from "../enums/currency.enum";
import { IPrice } from "../interfaces/price.interface";

export const calculatePrices = (
    amount: number,
    currency: CurrencyEnum,
): IPrice => {
    const amountInUah = amount * ExchangeRates[currency];
    return {
        [CurrencyEnum.UAH]: amountInUah,
        [CurrencyEnum.USD]:
            Math.round((amountInUah / ExchangeRates.USD) * 100) / 100,
        [CurrencyEnum.EUR]:
            Math.round((amountInUah / ExchangeRates.EUR) * 100) / 100,
        originalCurrency: currency,
        originalPrice: amount,
    };
};
