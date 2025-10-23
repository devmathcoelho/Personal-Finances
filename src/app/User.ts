import { Category } from "./Category"
import { Expense, Revenue } from "./Expense"
import { Bill } from "./Home/Bill"

export type User = {
    id: number,
    name: string,
    totalBalance: number,
    totalRevenue: number,
    totalExpense: number,
    expenses: Expense[],
    revenues: Revenue[],
    categories: Category[],
    bills: Bill[]
}