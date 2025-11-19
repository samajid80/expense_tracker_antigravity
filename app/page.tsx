"use client";

import { useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SummaryCards } from "@/components/SummaryCards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showAddForm ? "Close Form" : "Add Expense"}
        </Button>
      </div>

      <SummaryCards />

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
        <div className="lg:col-span-1">
          {showAddForm ? (
            <div className="sticky top-6">
              <ExpenseForm onClose={() => setShowAddForm(false)} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p>Click "Add Expense" to record a new transaction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
