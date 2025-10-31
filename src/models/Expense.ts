export type Expense = {
    id: number | undefined,
    name: string,
    value: number,
    category: string,
    date: string,
    userId: number | undefined
}

export type Revenue = {
    name: string,
    value: number,
    date: string,
    userId: number | undefined
}