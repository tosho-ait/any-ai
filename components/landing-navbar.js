"use client";

import {Montserrat} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@clerk/nextjs";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Atom} from "lucide-react";

const font = Montserrat({weight: "600", subsets: ["latin"]});

export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className={cn("pr-2 w-fit rounded-md", "bg-blue-700/5")}>
                    <Atom className={cn("w-10 h-10", "text-blue-700")}/>
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Genius
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    );
};
