import React, { createContext, useState } from 'react'

export interface Value {
    value: number
    date: string
}

export interface Service {
    _id: string
    value: number
}

export type SetService = React.Dispatch<React.SetStateAction<Service>>

export type SetServices = React.Dispatch<React.SetStateAction<Service[]>>

export type ServicesState = [Service[], SetServices]

const DEFAULT_SERVICE: Service = {
    _id: '',
    value: 0
}

export interface Expense {
    _id: string
    date: string
    value: number
}


export type SetExpenses = React.Dispatch<React.SetStateAction<Expense[]>>
export type ExpensesState = [Expense[], SetExpenses]

const DEFAULT_EXPENSE: Expense = {
    _id: '',
    date: '',
    value: 0
}

interface TDocsContext {
    services: ServicesState
    expenses: ExpensesState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    expenses: [[DEFAULT_EXPENSE], () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
}

const DocsProvider = ({ children }: DocsProviderProps) => {

    // Documentos usados na aplicação
    const [services, setServices] = useState<Service[]>([])
    const [expenses, setExpenses] = useState<Expense[]>([])

    const docs: TDocsContext = {
        services: [services, setServices],
        expenses: [expenses, setExpenses]
    }

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider