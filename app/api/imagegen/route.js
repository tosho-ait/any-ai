import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

import OpenAI from "openai";
import {checkApiLimit, increaseApiLimit} from "../../../lib/api-limit";
import {checkSubscription} from "../../../lib/subscription";

const openai = new OpenAI();

const instructionMessage = {
    role: "system",
    content: "You aer a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(req) {

    try {
        const {userId} = auth();
        const body = await req.json();
        const {prompt, amount = "1", resolution = "512x512"} = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", {status: 400});
        }

        const freeTrail = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro) {
            return new NextResponse("Free trail has expired", {status: 403});
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        });

        if (freeTrail) {
            await increaseApiLimit();
        }

        return NextResponse.json(response.data);

    } catch (e) {
        console.log(e)
        return new NextResponse("Internal error", {status: 500});
    }

}