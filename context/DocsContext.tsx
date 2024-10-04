import { orderExpenses } from '@/functions/expenses'
import { orderSchedulings } from '@/functions/schedulings'
import { orderServices } from '@/functions/services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

export interface Service {
    _id: string
    value: number
    amount?: number
}

type SetServices = React.Dispatch<React.SetStateAction<Service[]>>

type ServicesState = [Service[], SetServices]

const DEFAULT_SERVICE: Service = {
    _id: '',
    value: 0
}

export interface Expense {
    _id: string
    name: string
    date: string
    value: number
}


type SetExpenses = React.Dispatch<React.SetStateAction<Expense[]>>
type ExpensesState = [Expense[], SetExpenses]

const DEFAULT_EXPENSE: Expense = {
    _id: '',
    name: '',
    date: '',
    value: 0
}

interface SchedulingService extends Service {
    amount?: number
}

export interface Scheduling {
    _id: string
	service: SchedulingService
	date: string
}

type SetSchedulings = React.Dispatch<React.SetStateAction<Scheduling[]>>

type SchedulingsState = [Scheduling[], SetSchedulings]

const DEFAULT_SCHEDULING: Scheduling = {
    _id: '',
	service: {
		_id: '',
		value: 0
	},
	date: '',
}

interface TDocsContext {
    services: ServicesState
    expenses: ExpensesState
    schedulings: SchedulingsState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    expenses: [[DEFAULT_EXPENSE], () => { }],
    schedulings: [[DEFAULT_SCHEDULING], () => { }]
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

    const getServicesFromDb = async () => {
        try {
            const data = await AsyncStorage.getItem('services')
            if (data) {
                setServices(orderServices(JSON.parse(data)))
            }
        } catch (error) {
            Alert.alert('Erro ao acessar banco de dados')
        }
        
    }

    const getExpensesFromDb = async () => {
        try {
            const data = await AsyncStorage.getItem('expenses')
            if (data) {
                setExpenses(orderExpenses(JSON.parse(data)))
            }
        } catch (error) {
            Alert.alert('Erro ao acessar banco de dados')
        }
    }

    const getSchedulingsFromDb = async () => {
        try {
            const data = await AsyncStorage.getItem('schedulings')
            if (data) {
                setSchedulings(orderSchedulings(JSON.parse(data)))
            }
        } catch (error) {
            Alert.alert('Erro ao acessar banco de dados')
        }
    }

    useEffect(() => {
        getServicesFromDb()
        getExpensesFromDb()
        getSchedulingsFromDb()
    }, [])

    const docs: TDocsContext = {
        services: [services, setServices],
        expenses: [expenses, setExpenses],
        schedulings: [schedulings, setSchedulings]
    }

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}