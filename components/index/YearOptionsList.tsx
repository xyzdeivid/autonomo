import { DocsContext } from '@/context/DocsContext'
import { getAvailableYears } from '@/utils/info'
import { useContext, useEffect, useRef } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Pressable, Animated, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

interface YearOptionsListProps {
    setShowYearList: React.Dispatch<React.SetStateAction<boolean>>
}

export function YearOptionsList({ setShowYearList }: YearOptionsListProps) {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const availableYears = getAvailableYears(entries)
    const [, setCurrentYear] = appDocs.currentYear

    const slideAnim = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }, [slideAnim])

    return (
        <Pressable style={styles.container} onPress={() => setShowYearList(false)}>
            <Animated.View style={[
                { transform: [{ translateY: slideAnim }] }
            ]}>
                <ScrollView style={styles.overlay}>
                    {availableYears.map((year, index) => (
                        <View
                            style={{
                                borderBottomColor: '#00000040',
                                borderBottomWidth: index === availableYears.length - 1
                                    ? 0 : StyleSheet.hairlineWidth
                            }}
                            key={index}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentYear(year)
                                    setShowYearList(false)
                                }}
                                key={index}
                            >
                                <Text
                                    style={styles.year}
                                    key={year}
                                >
                                    {year}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        justifyContent: 'flex-end'
    },

    overlay: {
        width: 100,
        maxHeight: 150,
        backgroundColor: '#f6f6f6',
        borderTopRightRadius: 8
    },

    year: {
        padding: 12,
        textAlign: 'center',
        fontSize: 16,
        borderColor: '#00000040'
    }

})