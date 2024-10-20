import { orderExpenses } from '@/functions/expenses'
import { orderSchedulings } from '@/functions/schedulings'
import { orderServices } from '@/functions/services'
import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

export interface Service {
    category: string
    _id: string
    value: number
    amount: number
}

type SetServices = React.Dispatch<React.SetStateAction<Service[]>>

type ServicesState = [Service[], SetServices]

const DEFAULT_SERVICE: Service = {
    category: '',
    _id: '',
    value: 0,
    amount: 0
}

export interface Expense {
    category: string
    _id: string
    name: string
    date: string
    value: number
    amount: number
    productName?: string
}


type SetExpenses = React.Dispatch<React.SetStateAction<Expense[]>>
type ExpensesState = [Expense[], SetExpenses]

const DEFAULT_EXPENSE: Expense = {
    category: '',
    _id: '',
    name: '',
    date: '',
    value: 0,
    amount: 0,
}

export interface Scheduling {
    _id: string
	service: Service
	date: string
}

type SetSchedulings = React.Dispatch<React.SetStateAction<Scheduling[]>>

type SchedulingsState = [Scheduling[], SetSchedulings]

const DEFAULT_SCHEDULING: Scheduling = {
    _id: '',
	service: {
        category: '',
		_id: '',
		value: 0,
        amount: 0
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