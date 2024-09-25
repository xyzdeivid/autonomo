import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext } from '@/context/DocsContext'
import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import DeleteForm from '@/components/common/DeleteForm'
import MonthInput from '@/components/common/MonthInput'
import { View } from 'react-native'
import { MonthContext } from '@/context/Month'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState('')
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)

    const deleteExpense = (id: string) => {
        const remainingExpenses = expenses.filter(expense => {
            return expense._id !== id
        })
        setExpenses(remainingExpenses)
        setDeleteExpenseForm(false)
    }

    const filterExpenses = () => {
        return expenses.filter(current => {
            return Number(current.date.split('-')[1]) === selectedMonth + 1
        })
    }

    const ExpensesContent = () => (
        <View>
            <MonthInput />
            <ExpensesList filteredExpenses={filterExpenses()} setExpenseForDeletion={setExpenseForDeletion} setDeleteExpenseForm={setDeleteExpenseForm} />
        </View>
    )

    return (
        <Container>
            {
                expenses[0]
                    ? <ExpensesContent />
                    : <AnyItemWarning text='Nenhuma despesa cadastrada' />
            }
            {
                addExpenseForm
                    ? <AddExpenseForm setAddExpenseForm={setAddExpenseForm} />
                    : <AddItemButton setForm={setAddExpenseForm} bgColor='darkred' />
            }
            {
                deleteExpenseForm && (
                    <DeleteForm
                        targetName={expenseForDeletion}
                        deleteFunction={deleteExpense}
                        setFormOff={setDeleteExpenseForm}
                    />
                )
            }
        </Container>
    )
}