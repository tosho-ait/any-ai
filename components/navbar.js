import {UserButton} from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";


export default function Navbar({apiLimitCount, isPro}) {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar {...{apiLimitCount, isPro}}/>
            <div className="flex w-full justify-end">
                <UserButton/>
            </div>
        </div>
    );
}
