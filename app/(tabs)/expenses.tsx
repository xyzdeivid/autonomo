import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'

import { DocsContext, Expense } from '@/context/DocsContext'
import { useContext, useEffect, useState } from 'react'
import AddItemButton from '@/components/common/AddItemButton'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import { MonthContext } from '@/context/Month'
import { filterExpenses } from '@/functions/common'
import { orderExpenses } from '@/functions/expenses'
import AboutExpenseCard from '@/components/expenses/AboutExpenseCard'
import { MainDisplaysContext } from '@/context/MainDisplays'
import LoadingScreen from '@/components/common/LoadingScreen'
import WhatIsExpenseCard from '@/components/expenses/WhatIsExpenseCard'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Expenses() {

    const [expenses, setExpenses] = useContext(DocsContext).expenses
    const [items] = useContext(DocsContext).services
    const [selectedMonth] = useContext(MonthContext)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState({} as Expense)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [button, setButton] = useState(true)
    const [whatIsExpenseCard, setWhatIsExpenseCard] = useState(false)

    const deleteExpense = async (expense: Expense) => {

        setLoadingScreen(true)

        const remainingExpenses = expenses.filter(current => {
            return current._id !== expense._id
        })

        if (expense.amount) {

            const product = items.find(current =>
                current._id === expense.name
            )

            if (product) {

                if (product.amount > expense.amount) {

                    product.amount = product.amount - expense.amount

                } else {

                    product.amount = 0

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
            setExpenses(orderExpenses(remainingExpenses))

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

        setDeleteExpenseForm(false)
        setLoadingScreen(false)
        setHideTabBar(false)
        setButton(true)

    }

    useEffect(() => {
        AsyncStorage.getItem('expenses-experienced')
            .then(experienced => {
                if (!experienced) {
                    setWhatIsExpenseCard(true)
                    AsyncStorage.setItem('expenses-experienced', 'experienced')
                        .catch(() => Alert.alert('Erro ao acessar banco de dados'))
                }
            })
            .catch(() => Alert.alert('Erro ao acessar banco de dados'))
    }, [])

    return (
        <>
            {loadingScreen && <LoadingScreen />}
            <Container>
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