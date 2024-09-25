import { useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { MonthContext } from '@/context/Month'

export default function MonthInput() {

    const [selectedMonth, setSelectedMonth] = useContext(MonthContext)

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    return (
        <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
            {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={index} />
            ))}
        </Picker>
    )
}