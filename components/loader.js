import {cn} from "../lib/utils";
import {Atom} from "lucide-react";

export default function Loader({}) {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="h-10 w-10 relative animate-spin">
                <Atom className={cn("w-10 h-10", "text-blue-700")}/>
                {/*<Image alt="logo" fill scr="logo.png" />*/}
            </div>
            <p className="text-sm text-muted-foreground">Genius is thinking...</p>
        </div>
    );
}
