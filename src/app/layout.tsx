import type { Metadata } from "next";
import { Inter, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/ScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Kumi | SRE & Fullstack Engineer",
  description: "Ghanaian technologist building reliable systems and teaching the next generation of engineers.",
  metadataBase: new URL("https://isaackumi.heitechinc.com"),
  openGraph: {
    title: "Isaac Kumi | SRE & Fullstack Engineer",
    description: "Ghanaian technologist building reliable systems and teaching the next generation of engineers.",
    url: "https://isaackumi.heitechinc.com",
    siteName: "Isaac Kumi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Kumi | SRE & Fullstack Engineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${ubuntuMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent-blue/30 selection:text-white transition-colors duration-300">
        <Providers>
          <ScrollProvider>
            <CustomCursor />
            <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="fixed inset-0 scanline opacity-10 pointer-events-none" />
            {children}
          </ScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
