"use client";

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("fbfb2c90-fb32-4690-b1c0-51c9cb9c7475");
    }, [])

    return null;
}