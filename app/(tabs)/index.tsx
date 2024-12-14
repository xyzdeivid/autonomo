import { useContext, useEffect, useState } from 'react'
import { DocsContext } from '@/context/DocsContext'

import Container from '@/components/common/Container'
import AnyItemWarning from '@/components/common/AnyItemWarning'
import MonthInput from '@/components/common/MonthInput'
import { filterExpenses, filterSchedulings, getAvailableMonths } from '@/functions/common'
import Revenue from '@/components/info/Revenue'
import { ContentContext } from '@/context/InfoContent'
import GeneralButton from '@/components/info/GeneralButton'
import AddItemForm from '@/components/info/AddItemForm'
import AddServiceForm from '@/components/services/AddServiceForm'
import AddExpenseForm from '@/components/expenses/AddExpenseForm'
import AddSchedulingForm from '@/components/schedulings/AddSchedulingForm'
import WelcomeCard from '@/components/info/WelcomeCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import LoadingScreen from '@/components/common/LoadingScreen'
import { months } from '@/constants/common'

export default function Info() {

    const appDocs = useContext(DocsContext)
    const [schedulings] = appDocs.entries
    const [expenses] = appDocs.outflows
    const [services] = appDocs.items
    const [selectedMonth, setSelectedMonth] = appDocs.selectedMonth
    const [addItemsForm, setAddItemsForm] = useContext(ContentContext).form
    const [generalButton, setGeneralButton] = useContext(ContentContext).button
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [addExpenseForm, setAddExpenseForm] = useState(false)
    const [addSchedulingForm, setAddSchedulingForm] = useState(false)
    const [welcomeCard, setWelcomeCard] = useState(false)
    const [loadingScreen, setLoadingScreen] = useState(true)
    const [currentYear, setCurrentYear] = appDocs.currentYear
    const filteredEntries = filterSchedulings(schedulings, selectedMonth, currentYear)
    const filteredExpenses = filterExpenses(expenses, selectedMonth, currentYear)
    const availableMonths = getAvailableMonths(schedulings, expenses, currentYear, months)

    const openFirstItem = () => {

        try {

            AsyncStorage.setItem('experienced', 'experienced')

        } catch (err) {

            Alert.alert('Erro ao acessar banco de dados')

        }

    }

    useEffect(() => {
        AsyncStorage.getItem('experienced')
            .then(experienced => {
                setTimeout(() => {
                    setLoadingScreen(false)
                    if (!experienced) {
                        setWelcomeCard(true)
                    }
                }, 500)
            })
            .catch(() => Alert.alert('Erro ao acessar banco de dados'))
    }, [])

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

    return (
        <Container>
            {welcomeCard && (
                <WelcomeCard
                    setWelcomeCard={setWelcomeCard}
                    openFirstItem={openFirstItem}
                />
            )}
            {loadingScreen && (
                <LoadingScreen />
            )}
            {
                yearEntries[0] && (<MonthInput dropdownIconColor='#08819B' />)
            }
            {
                filterSchedulings(schedulings, selectedMonth, currentYear)[0]
                    || filterExpenses(expenses, selectedMonth, currentYear)[0]
                    ? <Revenue />
                    : <AnyItemWarning text='Nenhuma informação disponível' />
            }
            {
                generalButton
                && <GeneralButton
                    setAddItemsForm={setAddItemsForm}
                    setGeneralButton={setGeneralButton}
                />
            }
            {
                addItemsForm
                && <AddItemForm
                    setGeneralButton={setGeneralButton}
                    setAddItemsForm={setAddItemsForm}
                    setAddServiceForm={setAddServiceForm}
                    setAddExpenseForm={setAddExpenseForm}
                    setAddSchedulingForm={setAddSchedulingForm}
                    services={services}
                />
            }
            {
                addServiceForm
                && <AddServiceForm
                    setAddServiceForm={setAddServiceForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addExpenseForm
                && <AddExpenseForm
                    setAddExpenseForm={setAddExpenseForm}
                    setButton={setGeneralButton}
                />
            }
            {
                addSchedulingForm
                && <AddSchedulingForm
                    setAddSchedulingForm={setAddSchedulingForm}
                    setButton={setGeneralButton}
                />
            }
        </Container>
    )

}