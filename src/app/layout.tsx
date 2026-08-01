import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { VariantProvider } from "@/components/variant-provider";
import { IntroProvider } from "@/components/intro-provider";
import { ThemedBackground } from "@/components/themed-background";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Made Narayindra — Full Stack Developer",
  description: "Personal portfolio.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <VariantProvider>
              <IntroProvider>
                <ThemedBackground />
                <ScrollProgressBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </IntroProvider>
            </VariantProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
