import { CurrencyEnum } from "../enums/currency.enum";

export interface IAdViewsStatsParams {
    adId: string;
    lastDay: Date;
    lastWeek: Date;
    lastMonth: Date;
}

export interface IAdViewsStats {
    totalViews: number;
    totalViewsLastDay: number;
    totalViewsLastWeek: number;
    totalViewsLastMonth: number;
}

export interface IAvgPrice {
    [CurrencyEnum.UAH]: number;
    [CurrencyEnum.USD]: number;
    [CurrencyEnum.EUR]: number;
}

export interface IAvgPriceStats {
    averagePriceByCity: IAvgPrice;
    averagePriceOverall: IAvgPrice;
}

export interface IAdStats {
    views: IAdViewsStats;
    price: IAvgPriceStats;
}
