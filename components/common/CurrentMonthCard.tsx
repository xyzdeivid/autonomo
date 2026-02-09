import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { getMonthName } from '@/utils/common'
import { months } from '@/constants/common'

export function CurrentMonthCard() {

    const appDocs = useContext(DocsContext)
    const [selectedMonth] = appDocs.selectedMonth
    const [currentYear] = appDocs.currentYear

    return (
        <Text
            style={styles.currentMonth}
        >
            {getMonthName(months, selectedMonth)}/{currentYear}
        </Text>
    )

}

const styles = StyleSheet.create({

    currentMonth: {
        marginBottom: 12,
        backgroundColor: '#9D9C9C1A',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        textAlign: 'center'
    }

})