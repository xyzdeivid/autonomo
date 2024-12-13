import { orderServices } from '@/functions/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

export interface Service {
    category: string
    _id: string
    value: number
    isThereAmount: boolean
    resale: boolean
    amount?: number
}

type SetServices = React.Dispatch<React.SetStateAction<Service[]>>

type ServicesState = [Service[], SetServices]

const DEFAULT_SERVICE: Service = {
    category: '',
    _id: '',
    value: 0,
    isThereAmount: false,
    resale: false
}

export interface Expense {
    _id: string
    name: string
    date: string
    value: number
    amount?: number
}


type SetExpenses = React.Dispatch<React.SetStateAction<Expense[]>>
type ExpensesState = [Expense[], SetExpenses]

const DEFAULT_EXPENSE: Expense = {
    _id: '',
    name: '',
    date: '',
    value: 0,
}

export interface Scheduling {
    _id: string
    service: Service
    date: string
    customer?: string
}

type SetSchedulings = React.Dispatch<React.SetStateAction<Scheduling[]>>

type SchedulingsState = [Scheduling[], SetSchedulings]

const DEFAULT_SCHEDULING: Scheduling = {
    _id: '',
    service: {
        category: '',
        _id: '',
        value: 0,
        isThereAmount: false,
        resale: false
    },
    date: '',
}

type CurrentYearState = [string, React.Dispatch<React.SetStateAction<string>>]
type CurrentMonthState = [number, React.Dispatch<React.SetStateAction<number>>]

interface TDocsContext {
    services: ServicesState
    expenses: ExpensesState
    schedulings: SchedulingsState
    currentYear: CurrentYearState
    selectedMonth: CurrentMonthState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    expenses: [[DEFAULT_EXPENSE], () => { }],
    schedulings: [[DEFAULT_SCHEDULING], () => { }],
    currentYear: ['', () => { }],
    selectedMonth: [0, () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
}

export default function DocsProvider({ children }: DocsProviderProps) {

    // Documentos usados na aplicação
    const [services, setServices] = useState<Service[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [schedulings, setSchedulings] = useState<Scheduling[]>([])
    const [currentYear, setCurrentYear] = useState<string>('')
    const [selectedMonth, setSelectedMonth] = useState(0)

    type SetterT = React.Dispatch<React.SetStateAction<Service[]>> 
    | React.Dispatch<React.SetStateAction<Expense[]>>
    | React.Dispatch<React.SetStateAction<Scheduling[]>>

    const fetchData = async (storageKey: string, setter: SetterT) => {

        try {

            const data = await AsyncStorage.getItem(storageKey)

            if (data) {
                setter(JSON.parse(data))
            }

        } catch (err) {

            throw err

        }

    }

    const getCurrentYear = () => {
        
        const currentYear = String(new Date().getFullYear())
        const currentMonth = new Date().getMonth() + 1

        setCurrentYear(currentYear)
        setSelectedMonth(currentMonth)


    }

    const docs: TDocsContext = {
        services: [services, setServices],
        expenses: [expenses, setExpenses],
        schedulings: [schedulings, setSchedulings],
        currentYear: [currentYear, setCurrentYear],
        selectedMonth: [selectedMonth, setSelectedMonth]
    }

    useEffect(() => {

        const initializeData = async () => {

            try {

                await fetchData('items', setServices)
                await fetchData('expenses', setExpenses)
                await fetchData('schedulings', setSchedulings)

            } catch (err) {

                Alert.alert('Erro ao acessar banco de dados')

            }

        }

        
        getCurrentYear()
        initializeData()

    }, [])

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}