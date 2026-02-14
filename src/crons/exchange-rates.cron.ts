import { CronJob } from "cron";

import { ExchangeRates } from "../constants/exchange-rates.constants";
import { priceHelper } from "../helpers/price.helper";

const handler = async () => {
    const newRates = await priceHelper.fetchExchangeRates();
    Object.assign(ExchangeRates, newRates);
};

export const exchangeRatesCronJon = new CronJob("0 0 * * * *", handler);
