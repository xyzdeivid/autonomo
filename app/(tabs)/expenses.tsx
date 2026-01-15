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
    const [selectedExpenseId, setSelectedExpenseId] = useState<string>('')
    const expenseForDeletion = expenses.find(e => e._id === selectedExpenseId)
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
                            setExpenseForDeletion={setSelectedExpenseId}
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
                    // Se temos um ID e o formulário está ativo, mostramos o card
                    (deleteExpenseForm && expenseForDeletion) && (
                        <AboutOutflowCard
                            outflow={expenseForDeletion} // Agora este objeto vem atualizado da lista do contexto!
                            deleteFunction={deleteExpense}
                            setFormOff={setDeleteExpenseForm}
                        />
                    )
                }
            </Container>
        </>
    )
}