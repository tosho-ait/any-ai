import {Avatar} from "./ui/avatar";
import {cn} from "../lib/utils";
import {Atom} from "lucide-react";

export default function BotAvatar({}) {

    return (
        <Avatar className="h-8 w-8">
            <Atom className={cn("w-7 h-7 m-1", "text-blue-700")}/>
        </Avatar>
    );
}
