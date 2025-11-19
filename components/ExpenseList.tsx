"use client";

import React, { useState } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { Expense } from "@/types/expense";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { ExpenseForm } from "./ExpenseForm";

export function ExpenseList() {
    const { expenses, deleteExpense } = useExpenses();
    const [editingId, setEditingId] = useState<string | null>(null);

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (editingId) {
        const expenseToEdit = expenses.find((e) => e.id === editingId);
        if (expenseToEdit) {
            return (
                <div className="mt-6">
                    <ExpenseForm
                        existingExpense={expenseToEdit}
                        onClose={() => setEditingId(null)}
                    />
                </div>
            );
        }
    }

    if (expenses.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No expenses found. Add one to get started!
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            {sortedExpenses.map((expense) => (
                <Card key={expense.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-medium text-lg">{expense.title}</span>
                            <div className="text-sm text-muted-foreground flex space-x-2">
                                <span>{format(new Date(expense.date), "MMM d, yyyy")}</span>
                                <span>•</span>
                                <span className="bg-secondary px-2 py-0.5 rounded-full text-xs">
                                    {expense.category}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg">
                                ${expense.amount.toFixed(2)}
                            </span>
                            <div className="flex space-x-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingId(expense.id)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => deleteExpense(expense.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
