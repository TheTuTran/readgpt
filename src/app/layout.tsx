import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import { getAuthSession } from "@/lib/auth";

export const metadata = {
  title: "ReadGPT",
  description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  const session = await getAuthSession();
  return (
    <html lang="en" className={cn("antialias light", inter.className)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${
          session?.user.theme === "dark" ? "dark" : ""
        } min-h-screen pt-12 bg-background text-foreground antialiased`}
      >
        <Providers>
          <Navbar />

          {authModal}

          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
