import { exchangeRatesCronJon } from "./exchange-rates.cron";

export const cronRunner = () => {
    exchangeRatesCronJon.start();
};
