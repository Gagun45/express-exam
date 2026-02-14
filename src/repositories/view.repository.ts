import { QueryFilter, Types } from "mongoose";

import {
    IAdViewsStats,
    IAdViewsStatsParams,
} from "../interfaces/ad-stats.interface";
import { IView } from "../interfaces/view.interface";
import { View } from "../models/view.model";

export const viewRepository = {
    create: (adId: string): Promise<IView> => View.create({ adId }),
    countDocuments: (params: QueryFilter<IView>): Promise<number> =>
        View.countDocuments(params),
    getAdViewsStats: async ({
        adId,
        lastDay,
        lastWeek,
        lastMonth,
    }: IAdViewsStatsParams): Promise<IAdViewsStats> => {
        const [stats] = await View.aggregate<IAdViewsStats>([
            { $match: { adId: new Types.ObjectId(adId) } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: 1 },
                    totalViewsLastDay: {
                        $sum: {
                            $cond: [{ $gte: ["$createdAt", lastDay] }, 1, 0],
                        },
                    },
                    totalViewsLastWeek: {
                        $sum: {
                            $cond: [{ $gte: ["$createdAt", lastWeek] }, 1, 0],
                        },
                    },
                    totalViewsLastMonth: {
                        $sum: {
                            $cond: [{ $gte: ["$createdAt", lastMonth] }, 1, 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return (
            stats ?? {
                totalViews: 0,
                totalViewsLastDay: 0,
                totalViewsLastMonth: 0,
                totalViewsLastWeek: 0,
            }
        );
    },
};
