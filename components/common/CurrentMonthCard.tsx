import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { getMonthName } from '@/utils/common'
import { months } from '@/constants/common'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'

export function CurrentMonthCard() {

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    const theme = useGetTheme()

    return (
        <Text
            style={{
                ...styles.currentMonth,
                color: theme === 'dark' ? colors.cardText.dark : colors.cardText.light,
                backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light
            }}
        >
            {getMonthName(months, selectedMonth)}/{currentYear}
        </Text>
    )

}

const styles = StyleSheet.create({

    currentMonth: {
        marginBottom: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        textAlign: 'center'
    }

})