import { Toaster } from "@/components/ui/sonner";
import { geistMono, geistSans, ibmThai } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import QueryProviders from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroDay E-Commerce",
  description: "ระบบจำหน่ายสินค้าออนไลน์ ZeroDay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          ibmThai.className,
          "antialiased flex flex-col min-h-svh"
        )}
      >
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
