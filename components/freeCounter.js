"use client";

import {useEffect, useState} from "react";
import {Card, CardContent} from "./ui/card";
import {MAX_FREE_COUNTS} from "../constants";
import {Progress} from "./ui/progress";
import {Button} from "./ui/button";
import {Zap} from "lucide-react";
import {useProModal} from "../hooks/use-pro-model";

export default function FreeCounter({apiLimitCount, isPro}) {

    const proModal = useProModal();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    if (isPro) {
        return null;
    }

    return (
        <div>
            <Card className="bg-white/10 border-0">
                <CardContent className="py-3">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations</p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100}/>
                        <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                            Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
