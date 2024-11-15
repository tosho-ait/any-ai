import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

import OpenAI from "openai";
import {checkApiLimit, increaseApiLimit} from "../../../lib/api-limit";
import {checkSubscription} from "../../../lib/subscription";

const openai = new OpenAI();

const instructionMessage = {
    role: "system",
    content: "You are a code generator."
    // content: "You aer a code generator. You must answer only in markdown code snippets. Use code comments for explanations.You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(req) {

    try {
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }

        const freeTrail = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro) {
            return new NextResponse("Free trail has expired", {status: 403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [instructionMessage, ...messages]
        });

        if (freeTrail) {
            await increaseApiLimit();
        }

        return NextResponse.json(response.choices[0].message);

    } catch (e) {
        console.log(e)
        return new NextResponse("Internal error", {status: 500});
    }

}