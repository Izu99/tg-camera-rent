import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { COMPANY_NAME } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY_NAME} — Rental Management`,
  description: `${COMPANY_NAME} internal rental management system.`,
};

export const viewport: Viewport = {
  themeColor: "#0b3a56",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <TooltipProvider delayDuration={150}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SiteHeader />
              <main className="flex-1 pb-20 md:pb-6">{children}</main>
            </SidebarInset>
            <MobileBottomNav />
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
