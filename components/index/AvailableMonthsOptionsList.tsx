import { DocsContext } from '@/context/DocsContext'
import { useGetAvailableMonths } from '@/hooks/index/useGetAvailableMonths'
import { getMonthNameByMonthNumber } from '@/utils'
import { useContext, } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Pressable } from 'react-native'
import { OptionsListContainer } from './OptionsListContainer'

interface YearOptionsListProps {
    setShowAvailableMonthsOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function AvailableMonthsOptionsList({ setShowAvailableMonthsOptionsList, setShowSettingsCard }: YearOptionsListProps) {

    const appDocs = useContext(DocsContext)
    const [, setCurrentYear] = appDocs.currentYear
    const [, setSelectedMonth] = appDocs.selectedMonth

    const availableMonths = useGetAvailableMonths()

    return (
        <OptionsListContainer
            onPressOutside={() => setShowAvailableMonthsOptionsList(false)}
        >
            <Pressable
                onPress={() => { }}
            >
                <ScrollView
                    style={styles.overlay}
                >
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
                                    setShowAvailableMonthsOptionsList(false)
                                    setShowSettingsCard(false)
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
            </Pressable>
        </OptionsListContainer>
    )
}

const styles = StyleSheet.create({

    overlay: {
        maxHeight: 300,
        backgroundColor: '#f6f6f6',
        borderRadius: 8
    },

    year: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        textAlign: 'center',
        fontSize: 16,
        borderColor: '#00000040'
    }

})