import {auth, currentUser} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {absoluteUrl} from "../../../lib/utils";
import UserSubscription from "../../../models/UserSubscription";
import {stripe} from "../../../lib/stripe";
import {headers} from "next/headers";

const settingsUrl = absoluteUrl("/settings");

export async function POST(req) {

    const body = await req.text();
    const signature = headers().get("Stripe-Signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (e) {
        console.log(e)
        return new NextResponse("Webhook Error", {status: 400});
    }

    const session = event.data.object;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", {status: 400});
        }
        const userSubscription = await UserSubscription.create({
            userId: session?.metadata?.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        });
    }

    if (event.type === "invoice.payment.succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const userSubscription = await UserSubscription.findOne({stripeSubscriptionId: subscription.id});

        userSubscription.stripePriceId
            = subscription.items.data[0].price.id;
        userSubscription.stripeCurrentPeriodEnd
            = new Date(subscription.current_period_end * 1000);

        await userSubscription.save();
    }

    return new NextResponse(null, {status: 200});

}