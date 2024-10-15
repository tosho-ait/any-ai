import {auth} from "@clerk/nextjs/server";
import connectMongoDB from "./mongodb";
import UserApiLimit from "../models/UserApiLimit";
import {MAX_FREE_COUNTS} from "../constants";

export const increaseApiLimit = async () => {
    const {userId} = auth();
    if (!userId) {
        return;
    }
    await connectMongoDB();
    let userApiLimit = await UserApiLimit.findOne({userId});
    if (!userApiLimit) {
        userApiLimit = await UserApiLimit.create({userId, count: 1});
    } else {
        userApiLimit.count = userApiLimit.count + 1;
        await userApiLimit.save();
    }
}

export const checkApiLimit = async () => {
    const {userId} = auth();
    if (!userId) {
        return false;
    }
    await connectMongoDB();
    let userApiLimit = await UserApiLimit.findOne({userId});
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    }
    return false;
}

export const getApiLimitCount = async () => {
    const {userId} = auth();
    if (!userId) {
        return 0;
    }
    await connectMongoDB();
    let userApiLimit = await UserApiLimit.findOne({userId});
    if (userApiLimit) {
        return userApiLimit.count;
    }
    return 0;
}