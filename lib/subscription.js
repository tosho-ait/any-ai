import {auth} from "@clerk/nextjs/server";
import UserSubscription from "../models/UserSubscription";

const DAY_IN_MS = 8640000

export const checkSubscription = async () => {
    const {userId} = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await UserSubscription.findOne({userId});

    if (!userSubscription) {
        return false;
    }

    const isValid = userSubscription.stripePriceId
        && (userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS) > Date.now();

    return !!isValid;
}