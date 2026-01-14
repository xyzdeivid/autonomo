// native functions
import { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

// custom functions
import { filterExpenses } from '@/functions/common'

// context
import { DocsContext } from '@/context/DocsContext'
import { Outflow } from '@/types'
import { MainDisplaysContext } from '@/context/MainDisplays'

// common components
import Container from '@/components/common/Container'
import AddItemButton from '@/components/common/AddItemButton'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// expenses components
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import ExpensesList from '@/components/expenses/ExpensesList'
import AboutOutflowCard from '@/components/expenses/AboutOutflowCard'
import useDeleteOutflow from '@/hooks/useDeleteOutflow'

export default function Expenses() {

    const appDocs = useContext(DocsContext)
    const [expenses] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [expenseForDeletion, setExpenseForDeletion] = useState({} as Outflow)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setHideTabBar] = useContext(MainDisplaysContext).tabBar
    const [, setWhatIsExpenseCard] = useState(false)
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage

    const deleteOutflow = useDeleteOutflow().deleteOutflow

    const deleteExpense = async (expense: Outflow) => {

        setLoadingScreen(true)

        await deleteOutflow(expense)

        setDeleteExpenseForm(false)
        setLoadingScreen(false)
        setHideTabBar(false)

    }

    useEffect(() => {
        if (currentPage !== 'expenses') {
            setAddExpenseForm(false)
            setDeleteExpenseForm(false)
            setWhatIsExpenseCard(false)
        }
    }, [currentPage])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            setAddExpenseForm(false)
            return null
        })
    }, [])

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
                            text='listamos todas as suas despesas financeiras do mês.'
                            titleBgColor='#660000'
                            textBgColor='rgba(139, 0, 0, 0.1)'
                        />
                }
                <AddItemButton
                    setForm={setAddExpenseForm}
                    mainColor='#660000'
                    bgColor='rgba(139, 0, 0, 0.1)'
                    text='Registrar Despesa' />
                {
                    addExpenseForm
                    && <AddExpenseForm
                        setAddExpenseForm={setAddExpenseForm}
                    />
                }
                {
                    deleteExpenseForm && (
                        <AboutOutflowCard
                            outflow={expenseForDeletion}
                            deleteFunction={deleteExpense}
                            setFormOff={setDeleteExpenseForm}
                        />
                    )
                }
            </Container>
        </>
    )
}