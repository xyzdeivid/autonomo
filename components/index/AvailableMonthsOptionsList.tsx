import { DocsContext } from '@/context/DocsContext'
import { useGetAvailableMonths } from '@/hooks/index/useGetAvailableMonths'
import { getMonthNameByMonthNumber } from '@/utils'
import { useContext, } from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import { OptionsListContainer } from './OptionsListContainer'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'

interface YearOptionsListProps {
    setShowAvailableMonthsOptionsList: React.Dispatch<React.SetStateAction<boolean>>
    setShowSettingsCard: React.Dispatch<React.SetStateAction<boolean>>
}

export function AvailableMonthsOptionsList({ setShowAvailableMonthsOptionsList, setShowSettingsCard }: YearOptionsListProps) {

    const theme = useGetTheme()

    const appDocs = useContext(DocsContext)
    const [, setCurrentYear] = appDocs.currentYear
    const [, setSelectedMonth] = appDocs.selectedMonth

    const availableMonths = useGetAvailableMonths()

    function isFirst(index: number, arrayLength: number) {
        return index === (arrayLength - arrayLength)
    }

    function isLast(index: number, arrayLength: number) {
        return index === arrayLength - 1
    }

    return (
        <OptionsListContainer
            onPressOutside={() => setShowAvailableMonthsOptionsList(false)}
        >
                <ScrollView
                    style={styles.overlay}
                >
                    {availableMonths.map((month, index) => (
                        <View
                            key={index}
                            style={{
                                backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light,
                                borderTopLeftRadius: isFirst(index, availableMonths.length) ? 8 : 0,
                                borderTopRightRadius: isFirst(index, availableMonths.length) ? 8 : 0,
                                borderBottomLeftRadius: isLast(index, availableMonths.length) ? 8 : 0,
                                borderBottomRightRadius: isLast(index, availableMonths.length) ? 8 : 0
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedMonth(Number(month.month))
                                    setCurrentYear(month.year)
                                    setShowAvailableMonthsOptionsList(false)
                                    setShowSettingsCard(false)
                                }}
                            >
                                <Text
                                    style={{ ...styles.year, color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light }}
                                >
                                    {getMonthNameByMonthNumber(Number(month.month))} de {month.year}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
        </OptionsListContainer>
    )
}

const styles = StyleSheet.create({

    overlay: {
        maxHeight: 300,
        borderRadius: 8
    },

    year: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        textAlign: 'center',
        fontSize: 16
    }

})