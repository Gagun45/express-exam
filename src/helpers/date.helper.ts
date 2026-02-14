type PeriodType = "day" | "week" | "month";

export const dateHelper = {
    getDateBeforeNow: (period: PeriodType): Date => {
        const now = new Date();
        const result = new Date(now);

        switch (period) {
            case "day":
                result.setDate(result.getDate() - 1);
                break;

            case "week":
                result.setDate(result.getDate() - 7);
                break;

            case "month":
                result.setMonth(result.getMonth() - 1);
                break;

            default:
                throw new Error("Invalid period type");
        }

        return result;
    },
};
