import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'

interface YearOptionsProps {
    availableYears: string[]
}

export default function YearOptions({ availableYears }: YearOptionsProps) {

    const [currentYear, setCurrentYear] = useContext(DocsContext).currentYear

    return (
        <Picker
            selectedValue={currentYear}
            style={styles.container}
            onValueChange={year => setCurrentYear(year)}
        >
            {availableYears.map(year => (
                <Picker.Item value={year} label={year} key={year} />
            ))}
        </Picker>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
})