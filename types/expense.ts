export type Category =
    | "Travel"
    | "Food"
    | "Rent"
    | "Bills"
    | "Institution Fee"
    | "Grocery"
    | "Vehicle Maintenance"
    | "Fuel"
    | "Entertainment"
    | "Other Expenses";

export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string; // ISO string
    category: Category;
}

export const CATEGORIES: Category[] = [
    "Travel",
    "Food",
    "Rent",
    "Bills",
    "Institution Fee",
    "Grocery",
    "Vehicle Maintenance",
    "Fuel",
    "Entertainment",
    "Other Expenses",
];
