import { createContext, useState } from 'react'

export const MonthContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => 0])

interface MonthProviderProps {
    children: React.ReactNode
}

export default function MonthProvider({ children }: MonthProviderProps) {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

    return (
        <MonthContext.Provider value={[selectedMonth, setSelectedMonth]}>
            {children}
        </MonthContext.Provider>
    )

}