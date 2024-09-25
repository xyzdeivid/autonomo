import { DocsContext } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { useContext } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function RevenueList() {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const data = [
        { title: 'Receita', value: getSchedulingsRevenue(schedulings) },
        { title: 'Despesa', value: getExpenses(expenses) },
        { title: 'Lucro', value: getProfit(schedulings, expenses) }
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