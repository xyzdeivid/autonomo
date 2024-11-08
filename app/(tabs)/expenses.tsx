import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext, Expense } from '@/context/DocsContext'
import { useContext, useEffect, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import MonthInput from '@/components/common/MonthInput'
import { MonthContext } from '@/context/Month'
import { filterExpenses } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import AboutExpenseCard from '@/components/expenses/AboutExpenseCard'
import { MainDisplaysContext } from '@/context/MainDisplays'
import LoadingScreen from '@/components/common/LoadingScreen'
import WhatIsExpenseCard from '@/components/expenses/WhatIsExpenseCard'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [selectedMonth] = useContext(MonthContext)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState({} as Expense)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsExpenseCard, setWhatIsExpenseCard] = useState(false)

    const deleteExpense = (expense: Expense) => {

        setLoadingScreen(true)

        const remainingExpenses = expenses.filter(current => {
            return current._id !== expense._id
        })

        setTimeout(() => {
            setExpenses(orderExpenses(remainingExpenses))
            setDeleteExpenseForm(false)
            setLoadingScreen(false)
            setHideTabBar(false)
            setButton(true)
        }, 500)

    }

    useEffect(() => {
        setTimeout(() => {
            setWhatIsExpenseCard(true)
        }, 250)
    }, [])

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    expenses[0] && (
                        <MonthInput  dropdownIconColor='#660000'/>
                    )
                }
                {
                    filterExpenses(expenses, selectedMonth)[0]
                        ? <ExpensesList
                            filteredExpenses={filterExpenses(expenses, selectedMonth)}
                            setExpenseForDeletion={setExpenseForDeletion}
                            setDeleteExpenseForm={setDeleteExpenseForm}
                        />
                        : <AnyItemWarning text='Nenhuma saída cadastrada' />
                }
                {
                    button
                    && <AddItemButton
                        setForm={setAddExpenseForm}
                        bgColor='#660000'
                        text='Nova Saída'
                        setButton={setButton}
                        infoButtonColor='rgba(139, 0, 0, 0.5)'
                        setInfoCard={setWhatIsExpenseCard}
                    />
                }
                {
                    addExpenseForm
                    && <AddExpenseForm
                        setAddExpenseForm={setAddExpenseForm}
                        setButton={setButton}
                    />
                }
                {
                    deleteExpenseForm && (
                        <AboutExpenseCard
                            expense={expenseForDeletion}
                            deleteFunction={deleteExpense}
                            setFormOff={setDeleteExpenseForm}
                            setButton={setButton}
                        />
                    )
                }
                {whatIsExpenseCard && <WhatIsExpenseCard
                    setWhatIsExpenseCard={setWhatIsExpenseCard}
                    setButton={setButton}
                />}
            </Container>
        </>
    )
}