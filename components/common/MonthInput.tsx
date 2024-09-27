import { useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import { MonthContext } from '@/context/Month'

export default function MonthInput() {

    const [selectedMonth, setSelectedMonth] = useContext(MonthContext)

    const months: [string, number][] = [
        ['Janeiro', 0], 
        ['Fevereiro', 1], 
        ['Março', 2], 
        ['Abril', 3], 
        ['Maio', 4], 
        ['Junho', 5],
        ['Julho', 6], 
        ['Agosto', 7], 
        ['Setembro', 8], 
        ['Outubro', 9], 
        ['Novembro', 10], 
        ['Dezembro', 11]
    ]

    return (
        <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
            {months.map((month) => (
                <Picker.Item key={month[1]} label={month[0]} value={month[1]} />
            ))}
        </Picker>
    )
}