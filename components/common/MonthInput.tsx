import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

export default function MonthInput() {
    
    const [selectedMonth, setSelectedMonth] = useState('Janeiro')

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
                    <Picker.Item key={index} label={month} value={month} />
                ))}
            </Picker>
    )
}