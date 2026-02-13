import { Query } from "mongoose";

import { IAd } from "../interfaces/ad.interface";

export const adHelper = {
    populateAdQuery: (query: Query<any, IAd>): Query<any, IAd> => {
        return query
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city");
    },
};
