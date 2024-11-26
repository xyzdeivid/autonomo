import { useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import { MonthContext } from '@/context/Month'
import { months } from '@/constants/common'

interface MonthInputProps {
    dropdownIconColor?: string
}

export default function MonthInput({ dropdownIconColor }: MonthInputProps) {

    const [selectedMonth, setSelectedMonth] = useContext(MonthContext)

    return (
        <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            dropdownIconColor={dropdownIconColor ? dropdownIconColor : 'lightgray'}
        >
            {months.map(month => (
                <Picker.Item key={month[0]} label={month[0]} value={month[1]} />
            ))}
        </Picker>
    )
}