import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Echo",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialias light", inter.className)}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          <Navbar />

          {authModal}

          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
