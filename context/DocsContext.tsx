import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { getAllEntries, getAllItems, getAllOutflows } from '@/database/repositories'
import { initDatabase } from '@/database/initDatabase'
import { migrateData } from '@/storage/migrationDataFromAsyncStorage'

export interface Item {
    category: string
    _id: string
    value: number
    isThereAmount: boolean
    resale: boolean
    amount?: number
}

type SetItems = React.Dispatch<React.SetStateAction<Item[]>>

type ItemsState = [Item[], SetItems]

const DEFAULT_ITEM: Item = {
    category: '',
    _id: '',
    value: 0,
    isThereAmount: false,
    resale: false
}

export interface Outflow {
    _id: string
    name: string
    date: string
    value: number
    amount?: number
}


type SetOutflows = React.Dispatch<React.SetStateAction<Outflow[]>>
type OutflowsState = [Outflow[], SetOutflows]

const DEFAULT_OUTFLOW: Outflow = {
    _id: '',
    name: '',
    date: '',
    value: 0,
}

export interface Entry {
    _id: string
    serviceId: string
    serviceCategory: string
    serviceValue: number
    serviceIsThereAmount: boolean
    serviceAmount?: number
    date: string
    customer?: string
}

export interface OldEntry {
    _id: string
    service: Item
    date: string
    customer?: string
}

type SetEntries = React.Dispatch<React.SetStateAction<Entry[]>>

type EntriesState = [Entry[], SetEntries]

const DEFAULT_ENTRY: Entry = {
    _id: '',
    serviceId: '',
    serviceCategory: '',
    serviceValue: 0,
    serviceIsThereAmount: false,
    date: '',
}

type CurrentYearState = [string, React.Dispatch<React.SetStateAction<string>>]
type CurrentMonthState = [number, React.Dispatch<React.SetStateAction<number>>]
type CurrentPageState = [string, React.Dispatch<React.SetStateAction<string>>]

interface TDocsContext {
    items: ItemsState
    outflows: OutflowsState
    entries: EntriesState
    currentYear: CurrentYearState
    selectedMonth: CurrentMonthState
    currentPage: CurrentPageState
}

const DEFAULT_CONTEXT: TDocsContext = {
    items: [[DEFAULT_ITEM], () => { }],
    outflows: [[DEFAULT_OUTFLOW], () => { }],
    entries: [[DEFAULT_ENTRY], () => { }],
    currentYear: ['', () => { }],
    selectedMonth: [0, () => { }],
    currentPage: ['', () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
}

export default function DocsProvider({ children }: DocsProviderProps) {

    // Documentos usados na aplicação
    const [items, setItems] = useState<Item[]>([])
    const [outflows, setOutflows] = useState<Outflow[]>([])
    const [entries, setEntries] = useState<Entry[]>([])
    const [currentYear, setCurrentYear] = useState<string>('')
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [currentPage, setCurrentPage] = useState('index')

    const getCurrentYear = () => {
        
        const currentYear = String(new Date().getFullYear())
        const currentMonth = new Date().getMonth() + 1

        setCurrentYear(currentYear)
        setSelectedMonth(currentMonth)


    }

    const docs: TDocsContext = {
        items: [items, setItems],
        outflows: [outflows, setOutflows],
        entries: [entries, setEntries],
        currentYear: [currentYear, setCurrentYear],
        selectedMonth: [selectedMonth, setSelectedMonth],
        currentPage: [currentPage, setCurrentPage]
    }

    const getAndSetItems = async () => {

        try {

            const items = await getAllItems()
            const outflows = await getAllOutflows()
            const entries = await getAllEntries()

            setEntries(entries)
            setItems(items)
            setOutflows(outflows)

        } catch (err) {

            Alert.alert('DOCS CONTEXT ERROR', 'Failed to fetch items from the database.')

        }

    }

    useEffect(() => {

        async function startDb() {

            await initDatabase()
            await migrateData()
            await getAndSetItems()
            getCurrentYear()

        }

        startDb()

    }, [])

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}