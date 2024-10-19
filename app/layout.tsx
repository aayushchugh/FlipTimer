import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

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

export const metadata: Metadata = {
	metadataBase: new URL("https://fliptimer.ayushchugh.com/"),
	title: "FlipTimer",
	description:
		"Set a target date and see how much time is left in months, weeks, days, hours, minutes, and seconds.",
	openGraph: {
		title: "FlipTimer",
		description:
			"Set a target date and see how much time is left in months, weeks, days, hours, minutes, and seconds.",
		url: "https://fliptimer.ayushchugh.com/",
		siteName: "Target",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/ogs/ogs-bg.png",
				width: 1200,
				height: 630,
				alt: "FlipTimer",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "FlipTimer",
		card: "summary_large_image",
		creator: "@aayushchugh_x",
		creatorId: "@aayushchugh_x",
		site: "@aayushchugh_x",
		siteId: "@aayushchugh_x",
		description:
			"Set a target date and see how much time is left in months, weeks, days, hours, minutes, and seconds.",
		images: ["/ogs/ogs-bg.png"],
	},
	icons: {
		shortcut: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
				></script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>

			{process.env.GOOGLE_ANALYTICS_ID &&
				process.env.NODE_ENV === "production" && (
					<GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
				)}
		</html>
	);
}
