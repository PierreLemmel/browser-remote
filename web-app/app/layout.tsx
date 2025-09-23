import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ChataigneProvider } from "@/contexts/ChataigneContext";
import { ChataigneConfigOverlay } from "@/components/ChataigneConfigOverlay";

export const metadata: Metadata = {
	title: "Plml Browser Remote",
	description: "Remote control for Plml Chataigne apps",
};

export type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;

    return <html lang="en">
        <body className={cn(
            "antialiased",
            "w-screen h-screen overflow-hidden"
        )}>
            <ChataigneProvider>
                {children}
                <ChataigneConfigOverlay />
            </ChataigneProvider>
        </body>
    </html>
}