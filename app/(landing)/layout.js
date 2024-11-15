import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

export default async function DashboardLayout({children}) {

    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    );
}
