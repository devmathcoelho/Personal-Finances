import { Category } from "./Category"
import { Expense } from "./Expense"
import { Bill } from "./Bill"

export type User = {
    id: number,
    name: string,
    totalBalance: number,
    totalRevenue: number,
    totalExpense: number,
    expenses: Expense[],
    categories: Category[],
    bills: Bill[]
}