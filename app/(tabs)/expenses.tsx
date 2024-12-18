import Container from '@/components/common/Container'

import { DocsContext, Outflow } from '@/context/DocsContext'
import { useContext, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import { filterExpenses } from '@/functions/common'
import AboutExpenseCard from '@/components/expenses/AboutExpenseCard'
import { MainDisplaysContext } from '@/context/MainDisplays'
import LoadingScreen from '@/components/common/LoadingScreen'
import WhatIsExpenseCard from '@/components/expenses/WhatIsExpenseCard'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

export default function Expenses() {

    const appDocs = useContext(DocsContext)
    const [expenses, setExpenses] = appDocs.outflows
    const [items] = appDocs.items
    const [selectedMonth] = appDocs.selectedMonth
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState({} as Outflow)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsExpenseCard, setWhatIsExpenseCard] = useState(false)
    const [currentYear] = appDocs.currentYear

    const deleteExpense = async (expense: Outflow) => {

        setLoadingScreen(true)

        const remainingExpenses = expenses.filter(current => {
            return current._id !== expense._id
        })

        if (expense.amount) {

            const product = items.find(current =>
                current._id === expense.name
            )

            if (product) {

                if (product.amount) {

                    if (product.amount > expense.amount) {

                        product.amount = product.amount - expense.amount

                    } else {

                        product.amount = 0

                    }

                }

                const remainingItems = items.filter(current =>
                    current !== product
                )

                try {

                    await AsyncStorage.setItem('items', JSON.stringify([...remainingItems, product]))

                } catch (err) {

                    Alert.alert('Erro ao acessar banco de dados')

                }

            }

        }

        try {

            await AsyncStorage.setItem('expenses', JSON.stringify(remainingExpenses))
            setExpenses(remainingExpenses)

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setDeleteExpenseForm(false)
        setLoadingScreen(false)
        setHideTabBar(false)
        setButton(true)

    }

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
                {
                    filterExpenses(expenses, selectedMonth, currentYear)[0]
                        ? <ExpensesList
                            filteredExpenses={filterExpenses(expenses, selectedMonth, currentYear)}
                            setExpenseForDeletion={setExpenseForDeletion}
                            setDeleteExpenseForm={setDeleteExpenseForm}
                        />
                        : <AnyInfoWarning
                            page='saída'
                            text='Nesta página, listamos todas as suas saídas de capital do mês.'
                            titleBgColor='#660000'
                            textBgColor='rgba(139, 0, 0, 0.1)'
                        />
                }
                {
                    button
                    && <AddItemButton
                        setForm={setAddExpenseForm}
                        mainColor='#660000'
                        bgColor='rgba(139, 0, 0, 0.1)'
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