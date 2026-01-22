// native functions
import { useContext, useEffect, useState } from 'react'

// custom functions
import { areThereAnyItemsAvailable, filterExpenses, filterSchedulings, getAvailableMonths } from '@/utils/common'

// context
import { DocsContext } from '@/context/DocsContext'

// constants
import { months } from '@/constants/common'

// common components
import Container from '@/components/common/Container'
import MonthInput from '@/components/common/MonthInput'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

// info components
import Revenue from '@/components/index/Revenue'

import { colors } from '@/styles/appColors'
import { Alert, Text, View } from 'react-native'
import AddItemButton from '@/components/common/AddItemButton'
import { EntryOrOutflowOptions } from '@/components/index/EntryOrOutflowOptions'
import AddEntryForm from '@/components/entries/AddEntryForm'
import AddOutflowForm from '@/components/outflows/AddOutflowForm'

export default function Info() {

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [expenses] = appDocs.outflows
    const [items] = appDocs.items
    const [currentYear, setCurrentYear] = appDocs.currentYear
    const [selectedMonth, setSelectedMonth] = appDocs.selectedMonth

    const [showEntryOrOutflowOptions, setShowEntryOrOutflowOptions] = useState(false)
    const [showAddEntryForm, setShowAddEntryForm] = useState(false)
    const [showAddOutflowForm, setShowAddOutflowForm] = useState(false)

    const docsLoaded = appDocs.docsLoaded

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

    }, [schedulings, expenses,
        availableMonths, filteredExpenses,
        filteredEntries, setCurrentYear,
        setSelectedMonth, yearEntries,
        yearExpenses])

    return (
        <Container>
            {!docsLoaded && (
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 64 }}>. . .</Text>
                </View>
            )}
            {
                yearEntries[0] && (<MonthInput dropdownIconColor={colors.home.mid} />)
            }
            {
                filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                    || filterExpenses(expenses, selectedMonth, currentYear)[0]
                    ? <Revenue />
                    : null
            }
            <AddItemButton
                iconColor={colors.home.max}
                bgColor={colors.home.min}
                borderColor={colors.home.midMin}
                onPress={() => setShowEntryOrOutflowOptions(true)}
            />
            {
                showEntryOrOutflowOptions && (
                    <EntryOrOutflowOptions
                        setShowEntryOrOutflowOptions={setShowEntryOrOutflowOptions}
                        setShowAddEntryForm={() => {
                            const anyItemsAvailable = areThereAnyItemsAvailable(items)
                            if (anyItemsAvailable) {
                                setShowAddEntryForm(true)
                            }else {
                                Alert.alert('Erro', 'Não há nenhum produto ou serviço disponível.')
                            }
                        }}
                        setShowAddOutflowForm={()=> setShowAddOutflowForm(true)}
                    />
                )
            }
            {
                showAddEntryForm && (
                    <AddEntryForm setAddSchedulingForm={setShowAddEntryForm} />
                )
            }
            {
                showAddOutflowForm && (
                    <AddOutflowForm setAddExpenseForm={setShowAddOutflowForm} />
                )
            }
            {
                docsLoaded
                    && !filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                    && !filterExpenses(expenses, selectedMonth, currentYear)[0]
                    ? <AnyInfoWarning
                        text='te informamos sobre seu balanço financeiro mensal.'
                        titleBgColor={colors.home.max}
                        textBgColor={colors.home.min}
                    /> : null
            }
        </Container>
    )

}