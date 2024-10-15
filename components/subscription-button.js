"use client";

import {Button} from "./ui/button";
import {Zap} from "lucide-react";
import axios from "axios";
import {useState} from "react";

export default function SubscriptionButton({isPro = false}) {

    const [loading, isLoading] = useState(false);

    const onCLick = async () => {
        try {
            isLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (e) {
            console.log(e);
        } finally {
            isLoading(false);
        }
    }

    return (
        <Button variant={isPro ? "default" : "premium"}
                onClick={onCLick} disabled={loading}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    );
}
