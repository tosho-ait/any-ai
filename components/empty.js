import Image from "next/image";
import {CandyOff} from "lucide-react";

export default function Empty({label}) {
    return (
        <div className="h-full p-8 flex flex-col items-center">
            {/*<div className="relative h-72 w-72">*/}
            <CandyOff className="w-20 h-20 m-8 text-muted-foreground"/>
            {/*<Image alt="Empty" fill src="/empty.png"/>*/}
            {/*</div>*/}
            <p className="text-sm text-center text-muted-foreground">{label}</p>
        </div>
    );
}
