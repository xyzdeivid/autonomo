import { DocsContext } from '@/context/DocsContext'
import { useContext, useEffect, useRef } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Animated, StyleSheet, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface YearOptionsProps {
    availableYears: string[]
    setShowYearOptions: React.Dispatch<React.SetStateAction<boolean>>
}

export default function YearOptions({ availableYears, setShowYearOptions }: YearOptionsProps) {

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
        <Animated.View
            style={{
                ...styles.container,
                transform: [{ translateX: slideAnim }]
            }}
        >
            <Picker
                selectedValue={currentYear}
                style={styles.select}
                onValueChange={year => setCurrentYear(year)}
                dropdownIconColor='gray'
            >
                {availableYears.map(year => (
                    <Picker.Item value={year} label={year} key={year} />
                ))}
            </Picker>
            <View style={styles.closeButton}>
                <FontAwesome
                    name='close'
                    onPress={() => setShowYearOptions(false)}
                    size={26}
                    color='#08819B'
                />
            </View>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    select: {
        width: '55%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    closeButton: {
        marginStart: 6
    }
})