import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { getAllEntries } from '@/database/entryRepositories'
import { getAllItems } from '@/database/itemRepositories'
import { getAllOutflows } from '@/database/outflowRepositories'
import { initDatabase } from '@/database/initDatabase'
import { migrateData } from '@/storage/migrationDataFromAsyncStorage'
import { Entry, Item, Outflow } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SetItems = React.Dispatch<React.SetStateAction<Item[]>>

type ItemsState = [Item[], SetItems]

const DEFAULT_ITEM: Item = {
    category: '',
    _id: '',
    value: 0,
    isThereAmount: false,
    resale: false
}


type SetOutflows = React.Dispatch<React.SetStateAction<Outflow[]>>
type OutflowsState = [Outflow[], SetOutflows]

const DEFAULT_OUTFLOW: Outflow = {
    _id: '',
    name: '',
    date: '',
    value: 0,
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
    docsLoaded: boolean
    firstTime: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const DEFAULT_CONTEXT: TDocsContext = {
    items: [[DEFAULT_ITEM], () => { }],
    outflows: [[DEFAULT_OUTFLOW], () => { }],
    entries: [[DEFAULT_ENTRY], () => { }],
    currentYear: ['', () => { }],
    selectedMonth: [0, () => { }],
    currentPage: ['', () => { }],
    docsLoaded: false,
    firstTime: [true, () => {}]
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
    const [docsLoaded, setDocsLoaded] = useState(false)
    const [firstTime, setFirstTime] = useState(true)

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
        currentPage: [currentPage, setCurrentPage],
        docsLoaded: docsLoaded,
        firstTime: [firstTime, setFirstTime]
    }

    const isFirstTime = async (): Promise<boolean> => {

        try {

            const firstTime = await AsyncStorage.getItem('first-time')

            if (typeof firstTime !== 'string') {
                await AsyncStorage.setItem('first-time', '.')
            }

            return typeof firstTime !== 'string'

        } catch {

            Alert.alert('Erro', 'Erro ao verificar primeiro uso!')

            return true

        }

    }

    const getAndSetItems = async () => {

        try {

            const firstTime = await isFirstTime()
            const items = await getAllItems()
            const outflows = await getAllOutflows()
            const entries = await getAllEntries()

            setFirstTime(firstTime)
            setEntries(entries)
            setItems(items)
            setOutflows(outflows)
            setDocsLoaded(true)

        } catch {

            Alert.alert('DOCS CONTEXT ERROR', 'Failed to fetch items from the database.')

        }

    }

    useEffect(() => {

        async function startDb() {

            await initDatabase()

            // Migrando dados de db antigos se necessário
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