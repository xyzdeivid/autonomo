import { Expense, Scheduling } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

interface RevenueListProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueList({ filteredSchedulings, filteredExpenses }: RevenueListProps) {

    const data = [
        { title: 'Receita', value: getSchedulingsRevenue(filteredSchedulings), itemColor: 'darkgreen' },
        { title: 'Despesa', value: getExpenses(filteredExpenses), itemColor: 'darkred' },
        { title: 'Lucro', value: getProfit(filteredSchedulings, filteredExpenses), itemColor: 'darkblue' }
    ]

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.listItem}>
                <View style={{...styles.listItem, marginBottom: 2}}>
                    <Entypo name="flickr-with-circle" size={16} color={item.itemColor} />
                    <Text style={styles.title}>{item.title}:</Text> 
                </View>
                <Text>{moneyFormat(item.value)}</Text>
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
        fontWeight: 'bold',
        marginStart: 2
    },
    listItem: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center'
    }
})