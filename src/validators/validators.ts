import { adValidator } from "./ad.schema";
import { authValidator } from "./auth.schema";
import { carValidator } from "./car.schema";
import { cityValidator } from "./city.schema";
import { reportVadidator } from "./report.schema";
import { userValidator } from "./user.schema";

export const VALIDATORS = {
    ad: adValidator,
    auth: authValidator,
    car: carValidator,
    city: cityValidator,
    report: reportVadidator,
    user: userValidator,
} as const;
