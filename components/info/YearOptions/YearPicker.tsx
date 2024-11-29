import { useContext, useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { DocsContext } from '@/context/DocsContext'
import { AntDesign } from '@expo/vector-icons'

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
                dropdownIconColor='gray'
            >
                {availableYears.map(year => (
                    <Picker.Item value={year} label={year} key={year} />
                ))}
            </Picker>
            <View style={{ paddingStart: 8 }}>
                <AntDesign
                    name='caretleft'
                    size={24}
                    color='#08819B'
                    onPress={() => closePicker()}
                />
            </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
})