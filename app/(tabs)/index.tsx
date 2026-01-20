// native functions
import { useContext, useEffect, useState } from 'react'

// custom functions
import { filterExpenses, filterSchedulings, getAvailableMonths } from '@/utils/common'

// context
import { DocsContext } from '@/context/DocsContext'

// constants
import { months } from '@/constants/common'

// common components
import Container from '@/components/common/Container'
import MonthInput from '@/components/common/MonthInput'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// info components
import Revenue from '@/components/info/Revenue'

// scheduling components
import AddSchedulingForm from '@/components/entries/AddEntryForm'

// expense components
import AddExpenseForm from '@/components/outflows/AddOutflowForm'
import { colors } from '@/constants/appColors'

export default function Info() {

    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [addSchedulingForm, setAddSchedulingForm] = useState(false)

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [expenses] = appDocs.outflows
    const [currentYear, setCurrentYear] = appDocs.currentYear
    const [currentPage] = appDocs.currentPage
    const [selectedMonth, setSelectedMonth] = appDocs.selectedMonth

    const filteredEntries = filterSchedulings(schedulings, selectedMonth, currentYear)
    const filteredExpenses = filterExpenses(expenses, selectedMonth, currentYear)
    const availableMonths = getAvailableMonths(schedulings, expenses, currentYear, months)

    const yearEntries = schedulings.filter(entry => (
        entry.date.split('-')[0] === currentYear
    ))

    const yearExpenses = expenses.filter(expense => (
        expense.date.split('-')[0] === currentYear
    ))

    useEffect(() => {

        if (!yearEntries[0] && !yearExpenses[0]) {
            setCurrentYear(String(new Date().getFullYear()))
        }

        if (!filteredEntries[0] && !filteredExpenses[0]) {
            const lastMonth = availableMonths.length - 1
            setSelectedMonth(availableMonths[lastMonth][1])
        }

    }, [schedulings, expenses])

    useEffect(() => {
        if (currentPage !== 'index') {
            setAddSchedulingForm(false)
            setAddExpenseForm(false)
        }
    }, [currentPage])

    return (
        <Container>
            {
                yearEntries[0] && (<MonthInput dropdownIconColor={colors.home.mid} />)
            }
            {
                filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                    || filterExpenses(expenses, selectedMonth, currentYear)[0]
                    ? <Revenue />
                    : <AnyInfoWarning
                        text='te informamos sobre seu balanço financeiro mensal.'
                        titleBgColor={colors.home.max}
                        textBgColor={colors.home.min}
                    />
            }
            {
                addExpenseForm
                && <AddExpenseForm
                    setAddExpenseForm={setAddExpenseForm}
                />
            }
            {
                addSchedulingForm
                && <AddSchedulingForm
                    setAddSchedulingForm={setAddSchedulingForm}
                />
            }
        </Container>
    )

}