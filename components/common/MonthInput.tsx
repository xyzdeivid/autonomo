import { useContext, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
import { getAvailableMonths } from '@/utils/common'

interface MonthInputProps {
    dropdownIconColor?: string
}

export default function MonthInput({ dropdownIconColor }: MonthInputProps) {

    const appDocs = useContext(DocsContext)
    const [currentYear] = appDocs.currentYear
    const [entries] = appDocs.entries
    const [expenses] = appDocs.outflows
    const [selectedMonth, setSelectedMonth] = appDocs.selectedMonth
    const availableMonths = getAvailableMonths(entries, expenses, currentYear, months)

    useEffect(() => {
        const lastMonth = availableMonths.length - 1
        setSelectedMonth(availableMonths[lastMonth][1])
    }, [currentYear])

    return (
        <>
            {
                availableMonths.length > 1
                && <Picker
                style={{ 
                    backgroundColor:  dropdownIconColor ? dropdownIconColor : 'lightgray',
                    color: 'white'
                }}
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    dropdownIconColor='white'
                >
                    {availableMonths.map(month => (
                        <Picker.Item key={month[0]} label={month[0]} value={month[1]} />
                    ))}
                </Picker>
            }
        </>

    )
}