import { DocsContext } from '@/context/DocsContext'
import { useGetAvailableMonths } from '@/hooks/index/useGetAvailableMonths'
import { getMonthNameByMonthNumber } from '@/utils'
import { useContext, useEffect, useRef } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Pressable, Animated, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

interface YearOptionsListProps {
    setShowYearList: React.Dispatch<React.SetStateAction<boolean>>
}

export function YearOptionsList({ setShowYearList }: YearOptionsListProps) {

    const appDocs = useContext(DocsContext)
    const [, setCurrentYear] = appDocs.currentYear
    const [, setSelectedMonth] = appDocs.selectedMonth

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

    const availableMonths = useGetAvailableMonths()

    return (
        <Pressable style={styles.container} onPress={() => setShowYearList(false)}>
            <Animated.View style={[
                { transform: [{ translateY: slideAnim }] }
            ]}>
                <ScrollView style={styles.overlay}>
                    {availableMonths.map((month, index) => (
                        <View
                            key={index}
                            style={{
                                borderBottomColor: '#00000040',
                                borderBottomWidth: index === availableMonths.length - 1 
                                ? 0 : StyleSheet.hairlineWidth
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedMonth(Number(month.month))
                                    setCurrentYear(month.year)
                                    setShowYearList(false)
                                }}
                                key={index}
                            >
                                <Text
                                    style={styles.year}
                                    key={index}
                                >
                                    {getMonthNameByMonthNumber(Number(month.month))} de {month.year}
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
        width: 210,
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