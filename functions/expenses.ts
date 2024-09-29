import { Expense } from '@/context/DocsContext'

export const orderExpenses = (expenses: Expense[]) => {

    return expenses.sort((a, b) => a.date.localeCompare(b.date)).reverse()

}