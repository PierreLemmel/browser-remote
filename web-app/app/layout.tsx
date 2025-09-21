import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/web-app/lib/utils";


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
		<body
			className={cn("antialiased")}
		>
			{children}
		</body>
    </html>
}