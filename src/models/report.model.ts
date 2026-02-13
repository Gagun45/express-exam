import { model, Schema } from "mongoose";

import { ReportTypeEnum } from "../enums/report-type.enum";
import { IReport } from "../interfaces/report.interface";

const ReportSchema = new Schema(
    {
        type: {
            type: String,
            enum: Object.values(ReportTypeEnum),
            required: true,
        },
        name: { type: String, required: true },
        relatedBrandId: { type: Schema.Types.ObjectId, ref: "CarBrand" },
    },
    { versionKey: false, timestamps: true },
);

export const Report = model<IReport>("Report", ReportSchema);
