import { CronJob } from "cron";

import { priceHelper } from "../helpers/price.helper";

const handler = async () => {
    await priceHelper.fetchExchangeRates();
};

export const exchangeRatesCronJon = new CronJob("0 0 * * * *", handler);
