import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

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
    service: Item
    date: string
    customer?: string
}

type SetEntries = React.Dispatch<React.SetStateAction<Entry[]>>

type EntriesState = [Entry[], SetEntries]

const DEFAULT_ENTRY: Entry = {
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
    items: ItemsState
    outflows: OutflowsState
    entries: EntriesState
    currentYear: CurrentYearState
    selectedMonth: CurrentMonthState
}

const DEFAULT_CONTEXT: TDocsContext = {
    items: [[DEFAULT_ITEM], () => { }],
    outflows: [[DEFAULT_OUTFLOW], () => { }],
    entries: [[DEFAULT_ENTRY], () => { }],
    currentYear: ['', () => { }],
    selectedMonth: [0, () => { }]
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

    type SetterT = React.Dispatch<React.SetStateAction<Item[]>> 
    | React.Dispatch<React.SetStateAction<Outflow[]>>
    | React.Dispatch<React.SetStateAction<Entry[]>>

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
        items: [items, setItems],
        outflows: [outflows, setOutflows],
        entries: [entries, setEntries],
        currentYear: [currentYear, setCurrentYear],
        selectedMonth: [selectedMonth, setSelectedMonth]
    }

    useEffect(() => {

        const initializeData = async () => {

            try {

                await fetchData('items', setItems)
                await fetchData('expenses', setOutflows)
                await fetchData('schedulings', setEntries)

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