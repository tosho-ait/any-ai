import Heading from "../../../../components/heading";
import {Settings2} from "lucide-react";
import {checkSubscription} from "../../../../lib/subscription";
import SubscriptionButton from "../../../../components/subscription-button";

export default async function Settings() {

    const isPro = await checkSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage account settings."
                icon={Settings2}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"/>

            <div className="px-4 lg:px-8 space-y-4">

                <div className="text-muted-foreground text-sm">
                    {isPro ? "You are currently on a pro plan" : "You are currently on a free plan."}
                </div>
                <SubscriptionButton {...{isPro}}/>

            </div>

        </div>
    );
}
