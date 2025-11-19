"use client";

import React, { useState } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type ReportType = "daily" | "monthly";

export default function ReportsPage() {
    const { expenses } = useExpenses();
    const [reportType, setReportType] = useState<ReportType>("monthly");

    // Group expenses
    const groupedExpenses = expenses.reduce((acc, expense) => {
        const date = new Date(expense.date);
        const key =
            reportType === "daily"
                ? format(date, "yyyy-MM-dd")
                : format(date, "yyyy-MM");

        if (!acc[key]) {
            acc[key] = {
                total: 0,
                items: [],
            };
        }
        acc[key].total += expense.amount;
        acc[key].items.push(expense);
        return acc;
    }, {} as Record<string, { total: number; items: typeof expenses }>);

    // Sort keys descending (newest first)
    const sortedKeys = Object.keys(groupedExpenses).sort((a, b) => b.localeCompare(a));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                <div className="flex space-x-2 bg-secondary p-1 rounded-lg">
                    <button
                        onClick={() => setReportType("daily")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-md transition-all",
                            reportType === "daily"
                                ? "bg-background shadow text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setReportType("monthly")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-md transition-all",
                            reportType === "monthly"
                                ? "bg-background shadow text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {sortedKeys.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        No data available for reports.
                    </div>
                ) : (
                    sortedKeys.map((key) => (
                        <Card key={key}>
                            <CardHeader className="bg-muted/50 py-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        {reportType === "daily"
                                            ? format(new Date(key), "EEEE, MMMM d, yyyy")
                                            : format(new Date(key + "-01"), "MMMM yyyy")}
                                    </CardTitle>
                                    <span className="font-bold text-xl">
                                        ${groupedExpenses[key].total.toFixed(2)}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-2">
                                    {groupedExpenses[key].items.map((expense) => (
                                        <div
                                            key={expense.id}
                                            className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="w-20 text-muted-foreground text-xs">
                                                    {format(new Date(expense.date), "h:mm a")}
                                                </span>
                                                <span className="font-medium">{expense.title}</span>
                                                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                                                    {expense.category}
                                                </span>
                                            </div>
                                            <span>${expense.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
