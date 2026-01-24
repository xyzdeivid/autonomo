// native functions
import { useContext, useEffect, useState } from 'react'

// custom functions
import { areThereAnyItemsAvailable, getAvailableMonths } from '@/utils/common'

// context
import { DocsContext } from '@/context/DocsContext'

// constants
import { months } from '@/constants/common'

// common components
import Container from '@/components/common/Container'
import MonthInput from '@/components/common/MonthInput'
import AnyInfoWarning from '@/components/common/AnyInfoWarning'

import { colors } from '@/styles/appColors'
import { Alert, Text, View } from 'react-native'
import AddItemButton from '@/components/common/AddItemButton'
import { EntryOrOutflowOptions } from '@/components/index/EntryOrOutflowOptions'
import AddEntryForm from '@/components/entries/AddEntryForm'
import AddOutflowForm from '@/components/outflows/AddOutflowForm'
import { filterExpensesByMonth, filterIncomesByMonth } from '@/rules/domainRules'
import { Insight } from '@/components/index/Insight'

export default function Info() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows
    const [items] = appDocs.items
    const [currentYear, setCurrentYear] = appDocs.currentYear
    const [selectedMonth, setSelectedMonth] = appDocs.selectedMonth

    const [showEntryOrOutflowOptions, setShowEntryOrOutflowOptions] = useState(false)
    const [showAddEntryForm, setShowAddEntryForm] = useState(false)
    const [showAddOutflowForm, setShowAddOutflowForm] = useState(false)

    const docsLoaded = appDocs.docsLoaded

    const filteredIncomes = filterIncomesByMonth(entries, selectedMonth, currentYear)
    const filteredExpenses = filterExpensesByMonth(outflows, selectedMonth, currentYear)
    const availableMonths = getAvailableMonths(entries, outflows, currentYear, months)

    const yearEntries = entries.filter(entry => (
        entry.date.split('-')[0] === currentYear
    ))

    const yearExpenses = outflows.filter(expense => (
        expense.date.split('-')[0] === currentYear
    ))

    useEffect(() => {

        if (!yearEntries[0] && !yearExpenses[0]) {
            setCurrentYear(String(new Date().getFullYear()))
        }

        if (!filteredIncomes[0] && !filteredExpenses[0]) {
            const lastMonth = availableMonths.length - 1
            setSelectedMonth(availableMonths[lastMonth][1])
        }

    }, [entries, outflows,
        availableMonths, filteredExpenses,
        filteredIncomes, setCurrentYear,
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
                docsLoaded
                    && !filteredIncomes[0]
                    && !filteredExpenses[0]
                    ? <AnyInfoWarning
                        text='te informamos sobre seu balanço financeiro mensal.'
                        titleBgColor={colors.home.max}
                        textBgColor={colors.home.min}
                    /> : <Insight
                        filteredIncomes={filteredIncomes}
                        filteredExpenses={filteredExpenses}
                    />
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
                            } else {
                                Alert.alert('Erro', 'Não há nenhum produto ou serviço disponível.')
                            }
                        }}
                        setShowAddOutflowForm={() => setShowAddOutflowForm(true)}
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
        </Container>
    )

}