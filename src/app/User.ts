import { Expense } from "./Expense"
import { Bill } from "./Home/Bill"

export type User = {
    name: string,
    expenses: Expense[],
    bills: Bill[],
    CreatedAt: string
}