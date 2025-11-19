import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Expense Tracker",
  description: "A simple and professional expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ExpenseProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto py-6 px-4">
              {children}
            </main>
          </div>
        </ExpenseProvider>
      </body>
    </html>
  );
}
