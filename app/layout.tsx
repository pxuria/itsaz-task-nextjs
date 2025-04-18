import type { Metadata } from "next";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/shared/SidebarLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <ReactQueryProvider>
          <SidebarProvider>
            <SidebarLayout />
            {children}
          </SidebarProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
