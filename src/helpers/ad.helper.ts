import { Query } from "mongoose";

import { IAd, IAdPopulated, IAdQuery } from "../interfaces/ad.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

export const adHelper = {
    populateAdQuery: (query: Query<any, IAd>): Query<any, IAd> => {
        return query
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city");
    },
    createQuery: (query: IAdQuery) => {
        const { limit, page } = query;
        const skip = limit * (page - 1);
        return {
            skip,
            limit,
        };
    },
    toIPaginatedResponse: (
        query: IAdQuery,
        ads: IAdPopulated[],
        totalItems: number,
    ): IPaginatedResponse<IAdPopulated> => {
        const { limit, page } = query;
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: ads,
            meta: {
                limit,
                page,
                nextPage: page < totalPages,
                prevPage: page > 1,
                totalItems,
                totalPages,
            },
        };
    },
};
