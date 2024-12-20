import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import Replicate from "replicate";
import {checkApiLimit, increaseApiLimit} from "../../../lib/api-limit";
import {checkSubscription} from "../../../lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req) {

    try {
        const {userId} = auth();
        const body = await req.json();
        const {prompt} = body;

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

        const input = {
            fps: 24,
            width: 1024,
            height: 576,
            prompt,
            guidance_scale: 17.5,
            // negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        };

        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", {input});

        if (freeTrail) {
            await increaseApiLimit();
        }

        return NextResponse.json(response);

    } catch (e) {
        console.log(e)
        return new NextResponse("Internal error", {status: 500});
    }

}