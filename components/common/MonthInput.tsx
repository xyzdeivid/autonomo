import { useContext, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import { MonthContext } from '@/context/Month'
import { months } from '@/constants/common'
import { DocsContext } from '@/context/DocsContext'
import { Alert } from 'react-native'
import { getAvailableMonths } from '@/functions/common'

interface MonthInputProps {
    dropdownIconColor?: string
}

export default function MonthInput({ dropdownIconColor }: MonthInputProps) {

    const [selectedMonth, setSelectedMonth] = useContext(MonthContext)
    const [currentYear] = useContext(DocsContext).currentYear
    const [entries] = useContext(DocsContext).schedulings

    return (
        <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            dropdownIconColor={dropdownIconColor ? dropdownIconColor : 'lightgray'}
        >
            {getAvailableMonths(entries, currentYear, months).map(month => (
                <Picker.Item key={month[0]} label={month[0]} value={month[1]} />
            ))}
        </Picker>
    )
}