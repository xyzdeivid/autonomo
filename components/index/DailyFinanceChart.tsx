import { useContext } from 'react'
import { moneyFormat } from '@/utils/common'
import { getDays } from '@/utils/info'

import { View, Text, StyleSheet } from 'react-native'

import { DocsContext } from '@/context/DocsContext'
import { filterIncomesByMonth } from '@/rules/domainRules'

export function DailyFinanceChart() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth
    const filteredIncomes = filterIncomesByMonth(entries, selectedMonth, currentYear)

    const data = () => {
        return getDays(filteredIncomes).map(day => {
            return {
                label: `Dia ${day.day}`,
                value: day.amount,
                topLabelComponent: () => (
                    <Text style={{ fontSize: 10, marginBottom: 2, color: '#004C99' }} >{moneyFormat(day.amount)}</Text>
                )
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text>Ainda não disponível!</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(17, 41, 53, 0.05)',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 20
    }
})