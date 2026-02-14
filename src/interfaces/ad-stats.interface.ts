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

export interface IAdStats {
    views: IAdViewsStats;
    price: {
        averagePriceInUahByCity: number;
        averagePriceInUahOverall: number;
    };
}
