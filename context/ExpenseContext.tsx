"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Expense } from "@/types/expense";

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, "id">) => void;
    deleteExpense: (id: string) => void;
    editExpense: (id: string, updatedExpense: Omit<Expense, "id">) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("expenses");
        if (stored) {
            try {
                setExpenses(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse expenses", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever expenses change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses, isLoaded]);

    const addExpense = (expense: Omit<Expense, "id">) => {
        const newExpense = { ...expense, id: crypto.randomUUID() };
        setExpenses((prev) => [newExpense, ...prev]);
    };

    const deleteExpense = (id: string) => {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
    };

    const editExpense = (id: string, updatedExpense: Omit<Expense, "id">) => {
        setExpenses((prev) =>
            prev.map((e) => (e.id === id ? { ...updatedExpense, id } : e))
        );
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpenses() {
    const context = useContext(ExpenseContext);
    if (context === undefined) {
        throw new Error("useExpenses must be used within an ExpenseProvider");
    }
    return context;
}
