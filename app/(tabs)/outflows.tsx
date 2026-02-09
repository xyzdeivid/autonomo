// native functions
import { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler } from 'react-native'

// custom functions
import { filterExpenses, getErrorMessage } from '@/utils/common'

// context
import { DocsContext } from '@/context/DocsContext'
import { Outflow } from '@/types'

// common components
import Container from '@/components/common/Container'
import AddItemButton from '@/components/common/AddItemButton'
import LoadingScreen from '@/components/common/LoadingScreen'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// expenses components
import AddExpenseForm from '@/components/outflows/AddOutflowForm'
import ExpensesList from '@/components/outflows/OutflowsList'
import AboutOutflowCard from '@/components/outflows/AboutOutflowCard'
import useDeleteOutflow from '@/hooks/outflows/useDeleteOutflow'
import { colors } from '@/styles/appColors'

export default function Expenses() {

    const appDocs = useContext(DocsContext)
    const [expenses] = appDocs.outflows
    const [selectedMonth] = appDocs.selectedMonth
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [selectedExpenseId, setSelectedExpenseId] = useState<string>('')
    const expenseForDeletion = expenses.find(e => e._id === selectedExpenseId)
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [, setWhatIsExpenseCard] = useState(false)
    const [currentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage

    const deleteOutflow = useDeleteOutflow().deleteOutflow

    const deleteExpense = async (expense: Outflow) => {

        setLoadingScreen(true)

        const result = await deleteOutflow(expense)

        if (!result.success && result.error) {
            Alert.alert('Erro', getErrorMessage(result.error))
        }

        setDeleteExpenseForm(false)
        setLoadingScreen(false)

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
                        ? <>
                            <ExpensesList
                                setOutflowForDeletion={setSelectedExpenseId}
                                setDeleteOuflowForm={setDeleteExpenseForm}
                            />
                            <AddItemButton
                                iconColor={'#FFF'}
                                bgColor={colors.outflows.max}
                                onPress={() => setAddExpenseForm(true)}
                            />
                        </>
                        : <AnyInfoWarning
                            text='listamos todas as suas despesas financeiras do mês.'
                            titleBgColor={colors.outflows.max}
                            textBgColor={colors.outflows.min}
                            addDataButtonText='Adicionar Despesa'
                            onAddDataButtonPress={() => setAddExpenseForm(true)}
                        />
                }

                {
                    addExpenseForm
                    && <AddExpenseForm
                        setAddExpenseForm={setAddExpenseForm}
                    />
                }
                {
                    (deleteExpenseForm && expenseForDeletion) && (
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