import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {getApiLimitCount} from "../../lib/api-limit";
import {checkSubscription} from "../../lib/subscription";

export default async function DashboardLayout({children}) {

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar {...{apiLimitCount, isPro}}/>
            </div>
            <div className="md:pl-72">
                <Navbar {...{apiLimitCount, isPro}}/>
                {children}
            </div>
        </div>
    );
}
