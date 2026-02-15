import axios from "axios";

import { ExchangeRates } from "../constants/exchange-rates.constants";
import { CurrencyEnum } from "../enums/currency.enum";
import { IPriceInfo } from "../interfaces/price.interface";
import { generalHelper } from "./general.helper";

export const priceHelper = {
    calculatePriceInfo: (
        amount: number,
        currency: CurrencyEnum,
    ): IPriceInfo => {
        const convertedPrices: Record<CurrencyEnum, number> = {} as any;

        // Convert amount to all currencies
        Object.values(CurrencyEnum).forEach((targetCurrency) => {
            const amountInUah = amount * ExchangeRates[currency];
            convertedPrices[targetCurrency] = generalHelper.roundNumber(
                amountInUah / ExchangeRates[targetCurrency],
            );
        });

        return {
            originalPrice: amount,
            originalCurrency: currency,
            convertedPrices,
            exchangeRates: { ...ExchangeRates },
        };
    },
    fetchExchangeRates: async (): Promise<void> => {
        const retries = 3;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await axios.get(
                    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11",
                );

                const data: {
                    ccy: string;
                    base_ccy: string;
                    buy: string;
                    sale: string;
                }[] = response.data;

                const rates: Record<CurrencyEnum, number> = {
                    [CurrencyEnum.UAH]: 1,
                    [CurrencyEnum.USD]: 0,
                    [CurrencyEnum.EUR]: 0,
                };

                data.forEach((item) => {
                    if (item.ccy === "USD")
                        rates[CurrencyEnum.USD] = generalHelper.roundNumber(
                            parseFloat(item.buy),
                        );
                    if (item.ccy === "EUR")
                        rates[CurrencyEnum.EUR] = generalHelper.roundNumber(
                            parseFloat(item.buy),
                        );
                });
                console.log(
                    "New rates from privatbank api successfully fetched: ",
                    rates,
                );
                Object.assign(ExchangeRates, rates);
                break;
            } catch (error) {
                console.warn(`Attempt ${attempt} failed: ${error}`);
                if (attempt < retries) {
                    console.log("Retrying in 10 seconds...");
                    await new Promise((res) => setTimeout(res, 10000));
                } else {
                    console.error(
                        "All attempts failed. Using last known rates: ",
                        ExchangeRates,
                    );
                }
            }
        }
        console.log("Next update: at midnight");
    },
};
