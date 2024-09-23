import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext } from '@/context/DocsContext'
import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [addExpenseForm, setAddExpenseForm] = useState(false)

    return (
        <Container>
            {
                expenses[0]
                    ? <ExpensesList />
                    : <AnyItemWarning />
            }
            {
                addExpenseForm
                    ? <AddExpenseForm setAddExpenseForm={setAddExpenseForm} />
                    : <AddItemButton setForm={setAddExpenseForm} bgColor='darkred' />
            }
        </Container>
    )
}