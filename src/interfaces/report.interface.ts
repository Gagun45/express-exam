import { Types } from "mongoose";

import { ReportTypeEnum } from "../enums/report-type.enum";
import { IBase } from "./base.interface";

export interface IReport extends IBase {
    name: string;
    relatedBrandId?: Types.ObjectId;
}

export type IReportCreateDto = Pick<IReport, "name" | "relatedBrandId">;
export type IReportEntityCreateDto = IReportCreateDto & {
    type: ReportTypeEnum;
};
