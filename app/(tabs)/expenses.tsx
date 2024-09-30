import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext } from '@/context/DocsContext'
import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import DeleteForm from '@/components/common/DeleteForm'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterExpenses } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState('')
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)

    const deleteExpense = async (id: string) => {

        const remainingExpenses = expenses.filter(expense => {
            return expense._id !== id
        })

        try {

            await AsyncStorage.setItem('expenses', JSON.stringify(remainingExpenses))

            setExpenses(orderExpenses(remainingExpenses))

        setDeleteExpenseForm(false)

        } catch (error) {
            
            Alert.alert('Erro ao salvar no banco de dados')

        }

    }

    return (
        <Container>
            {
                expenses[0] && (
                    <MonthInput />
                )
            }
            {
                filterExpenses(expenses, selectedMonth)[0]
                    ? <ExpensesList
                        filteredExpenses={filterExpenses(expenses, selectedMonth)}
                        setExpenseForDeletion={setExpenseForDeletion}
                        setDeleteExpenseForm={setDeleteExpenseForm}
                    />
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