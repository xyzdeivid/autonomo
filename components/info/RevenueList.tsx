import { Expense, Scheduling } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface RevenueListProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueList({ filteredSchedulings, filteredExpenses }: RevenueListProps) {

    const data = [
        { title: 'Receita', value: getSchedulingsRevenue(filteredSchedulings) },
        { title: 'Despesa', value: getExpenses(filteredExpenses) },
        { title: 'Lucro', value: getProfit(filteredSchedulings, filteredExpenses) }
    ]

    const renderItem = ({ item }: any) => {
        return (
            <View>
                <Text>
                    <Text style={styles.title}>{item.title}:</Text> 
                    {moneyFormat(item.value)}
                </Text>
            </View>
        )
    }

    return (
        <FlatList style={styles.container} data={data} renderItem={renderItem} />
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        marginStart: 8
    },
    title: {
        fontWeight: 'bold'
    }
})