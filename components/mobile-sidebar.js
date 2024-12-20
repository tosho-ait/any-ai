"use client";

import {Menu,} from "lucide-react";
import {Button} from "./ui/button";
import {Sheet, SheetTrigger, SheetContent} from "./ui/sheet";
import Sidebar from "./sidebar";
import {useEffect, useState} from "react";

export default function MobileSidebar({apiLimitCount, isPro}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar {...{apiLimitCount, isPro}}/>
            </SheetContent>
        </Sheet>

    );
}
