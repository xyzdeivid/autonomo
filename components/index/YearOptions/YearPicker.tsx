import { useContext, useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { DocsContext } from '@/context/DocsContext'

interface YearPickerProps {
    availableYears: string[]
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
}

export default function YearPicker({ availableYears, setShowPicker }: YearPickerProps) {

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

    const closePicker = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -1000,
                duration: 250,
                useNativeDriver: true
            }),
        ]).start(() => {
            setShowPicker(false)
        })
    }

    return (
        <Animated.View
            style={{
                ...styles.container,
                transform: [{ translateX: slideAnim }]
            }}>
            <Picker
                selectedValue={currentYear}
                style={styles.picker}
                onValueChange={year => {
                    setCurrentYear(year)
                    closePicker()
                }}
                dropdownIconColor='white'
            >
                {availableYears.map(year => (
                    <Picker.Item value={year} label={year} key={year} />
                ))}
            </Picker>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    picker: {
        width: '55%',
        backgroundColor: 'rgba(8, 129, 155, 0.75)',
        color: 'white'
    }
})