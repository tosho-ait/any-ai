import Image from "next/image";
import Link from "next/link";
import {Button} from "../../components/ui/button";

export default function LandingPage() {
    return (
        <div>
            <p className="text-6xl">Landing page</p>
            <div>
                <Link href="/sign-in">
                    <Button>Sign in</Button>
                </Link>
                &nbsp;
                <Link href="/sign-up">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    );
}
