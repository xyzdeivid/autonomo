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
            { category: 'product', _id: 'Revenda', value: 10, isThereAmount: true, resale: true, amount: 5 },
            { category: 'product', _id: 'Estoque', value: 20, isThereAmount: true, resale: false, amount: 5 },
            { category: 'product', _id: 'Sem Estoque', value: 30, isThereAmount: false, resale: false },
            { category: 'service', _id: 'Serviço Valor Fixo', value: 35, isThereAmount: false, resale: false },
            { category: 'budget', _id: 'Serviço Valor Variável', value: 0, isThereAmount: false, resale: false }
        ]

        const testOutflows: Outflow[] = [
            { _id: 'rvn-1', name: 'Revenda', date: '2026-01-01', value: 50, amount: 5 },
            { _id: 'rvn-2', name: 'Teste', date: '2026-01-02', value: 10 }
        ]

        const testEntries: Entry[] = [
            { _id: 'ent-1', serviceId: 'Revenda', serviceCategory: 'product', serviceValue: 10, serviceIsThereAmount: true, serviceAmount: 2, date: '2026-01-01', customer: 'Cliente A' },
            { _id: 'ent-2', serviceId: 'Estoque', serviceCategory: 'product', serviceValue: 20, serviceIsThereAmount: true, serviceAmount: 1, date: '2026-01-02', customer: 'Cliente B' },
            { _id: 'ent-3', serviceId: 'Sem Estoque', serviceCategory: 'product', serviceValue: 30, serviceIsThereAmount: true, serviceAmount: 3, date: '2026-01-03', customer: 'Cliente C' },
            { _id: 'ent-4', serviceId: 'Serviço Valor Fixo', serviceCategory: 'service', serviceValue: 35, serviceIsThereAmount: false, date: '2026-01-04', customer: 'Cliente D' },
            { _id: 'ent-5', serviceId: 'Serviço Valor Variável', serviceCategory: 'budget', serviceValue: 40, serviceIsThereAmount: false, date: '2026-01-05', customer: 'Cliente E' },
            { _id: 'ent-6', serviceId: 'Serviço Valor Fixo', serviceCategory: 'service', serviceValue: 35, serviceIsThereAmount: false, date: '2025-01-04', customer: 'Cliente F' },
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

            try {
                await initDatabase()
                await migrationData()
                await getAndSetItems()
                getCurrentYear()

            } catch (err) {

                Alert.alert(
                    'APP INIT ERROR',
                    'Failed to initialize app data.'
                )
                
            }
        }

        startDb()

    }, [])

    return (
        <DocsContext.Provider value={docs}>
            {children}
        </DocsContext.Provider>
    )

}