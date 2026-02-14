import { model, Schema, Types } from "mongoose";

import { IView } from "../interfaces/view.interface";

const ViewSchema = new Schema<IView>(
    {
        adId: { type: Types.ObjectId, ref: "Ad", required: true },
    },
    { timestamps: true, versionKey: false },
);
ViewSchema.index({ adId: 1, createdAt: -1 });

export const View = model<IView>("View", ViewSchema);
