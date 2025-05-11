import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ParticlesBackground } from "@/components/particles-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenBot - Mental Health Support",
  description: "Anonymous, empathetic mental health support chatbot",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ParticlesBackground />
          <Navbar />
          <main className="pt-16"> {/* Adjust this value to match Navbar height */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
