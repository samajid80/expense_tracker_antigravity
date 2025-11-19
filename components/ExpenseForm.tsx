"use client";

import React, { useState, useEffect } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { CATEGORIES, Category, Expense } from "@/types/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
    existingExpense?: Expense;
    onClose?: () => void;
}

export function ExpenseForm({ existingExpense, onClose }: ExpenseFormProps) {
    const { addExpense, editExpense } = useExpenses();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState<Category>(CATEGORIES[0]);

    useEffect(() => {
        if (existingExpense) {
            setTitle(existingExpense.title);
            setAmount(existingExpense.amount.toString());
            setDate(existingExpense.date.split("T")[0]);
            setCategory(existingExpense.category);
        }
    }, [existingExpense]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount || !date) return;

        const expenseData = {
            title,
            amount: parseFloat(amount),
            date: new Date(date).toISOString(),
            category,
        };

        if (existingExpense) {
            editExpense(existingExpense.id, expenseData);
        } else {
            addExpense(expenseData);
        }

        // Reset form
        setTitle("");
        setAmount("");
        setDate("");
        setCategory(CATEGORIES[0]);

        if (onClose) onClose();
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{existingExpense ? "Edit Expense" : "Add New Expense"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <Input
                            id="title"
                            placeholder="e.g. Grocery Shopping"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-sm font-medium">
                                Amount
                            </label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium">
                                Date
                            </label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        {onClose && (
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit">
                            {existingExpense ? "Update Expense" : "Add Expense"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
