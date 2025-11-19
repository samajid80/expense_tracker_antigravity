"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    const routes = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/",
        },
        {
            href: "/reports",
            label: "Reports",
            active: pathname === "/reports",
        },
    ];

    return (
        <nav className="border-b bg-background">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <div className="flex items-center mr-8">
                    <Wallet className="h-6 w-6 mr-2" />
                    <span className="font-bold text-lg">ExpenseTracker</span>
                </div>
                <div className="flex items-center space-x-4 lg:space-x-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                route.active
                                    ? "text-black dark:text-white"
                                    : "text-muted-foreground"
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
