import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { getAllEntries, getAllItems, getAllOutflows } from '@/database/repositories'
import { initDatabase } from '@/database/initDatabase'
import { migrationData } from '@/storage/migrationDataFromAsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    const generateDataToTest = async () => {

        const testItems: Item[] = [
            { _id: 'Revenda', amount: 10, category: 'product', isThereAmount: true, resale: true, value: 10 },
            { _id: 'Estoque', amount: 10, category: 'product', isThereAmount: true, resale: false, value: 15 },
            { _id: 'Sem Estoque', category: 'product', isThereAmount: false, resale: false, value: 20 },
            { _id: 'Serviço Valor Fixo', category: 'service', isThereAmount: false, resale: false, value: 25 },
            { _id: 'Serviço Valor Variável', category: 'budget', isThereAmount: false, resale: false, value: 0 }

        ]

        const testOutflows: Outflow[] = [
            { _id: 'stia4s1w4', amount: 10, date: '2026-01-09', name: 'Revenda', value: 50 },
            { _id: 'mrxsihaf1', date: '2026-01-09', name: 'Teste', value: 10}
        ]

        const testEntries = [
            { _id: 'ftp55x72i', date: '2026-01-09', service: { _id: 'Sem Estoque', amount: 1, category: 'product', isThereAmount: false, resale: false, value: 20 } },
            { _id: 'fmauy7l0z', customer: 'Teste', date: '2026-01-09', service: { _id: 'Sem Estoque', amount: 1, category: 'product', isThereAmount: false, resale: false, value: 20 } },
            { _id: 'xh7uaf2g5', date: '2026-01-09', service: { _id: 'Serviço Valor Fixo', category: 'service', isThereAmount: false, resale: false, value: 25 } },
            { _id: 'kh9c06913', customer: 'Teste', date: '2026-01-09', service: { _id: 'Serviço Valor Fixo', category: 'service', isThereAmount: false, resale: false, value: 25 } },
            { _id: 'goye7b9hl', date: '2026-01-09', service: { _id: 'Serviço Valor Variável', category: 'budget', isThereAmount: false, resale: false, value: 30 } },
            { _id: 'm15op3yi4', customer: 'Teste', date: '2026-01-09', service: { _id: 'Serviço Valor Variável', category: 'budget', isThereAmount: false, resale: false, value: 30 } },
            { _id: 'adcc0f6ws', date: '2026-01-09', service: { _id: 'Estoque', amount: 1, category: 'product', isThereAmount: true, resale: false, value: 15 } },
            { _id: 'b1se5u34f', customer: 'Teste', date: '2026-01-09', service: { _id: 'Estoque', amount: 1, category: 'product', isThereAmount: true, resale: false, value: 15 } },
            { _id: '4ax0swefu', date: '2026-01-09', service: { _id: 'Revenda', amount: 1, category: 'product', isThereAmount: true, resale: true, value: 10 } },
            { _id: 'j4j09i0m8', customer: 'Teste', date: '2026-01-09', service: { _id: 'Revenda', amount: 1, category: 'product', isThereAmount: true, resale: true, value: 10 } }
        ]

        try {

            await AsyncStorage.setItem('items', JSON.stringify(testItems))
            await AsyncStorage.setItem('expenses', JSON.stringify(testOutflows))
            await AsyncStorage.setItem('schedulings', JSON.stringify(testEntries))

        } catch (error) {

            Alert.alert('Erro ao salvar dados de teste no AsyncStorage.')

        }

    }

    useEffect(() => {

        async function startDb() {

            await generateDataToTest()
            await initDatabase()
            await migrationData()
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