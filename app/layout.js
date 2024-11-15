import localFont from "next/font/local";
import "./globals.css";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

import {ModalProvider} from "../components/modal-provider";
import {ToastProvider} from "../components/toaster-provider";
import {CrispProvider} from "../components/crisp-provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "AnyAI",
    description: "AI Proxy",
};

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ModalProvider/>
            <ToastProvider/>
            <CrispProvider/>
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
