import { DocsContext } from '@/context/DocsContext'
import { useContext, useEffect, useRef } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Animated, StyleSheet, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface YearOptionsProps {
    availableYears: string[]
}

export default function YearOptions({ availableYears }: YearOptionsProps) {

    const [currentYear, setCurrentYear] = useContext(DocsContext).currentYear
    const slideAnim = useRef(new Animated.Value(-1000)).current

    useEffect(() => {

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start()

    }, [])

    return (
        <Picker
            selectedValue={currentYear}
            style={styles.select}
            onValueChange={year => {
                setCurrentYear(year)
            }}
            dropdownIconColor='gray'
        >
            {availableYears.map(year => (
                <Picker.Item value={year} label={year} key={year} />
            ))}
        </Picker>
    )

}

const styles = StyleSheet.create({
    select: {
        width: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    closeButton: {
        marginStart: 6
    }
})