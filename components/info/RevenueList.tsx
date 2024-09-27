import { Expense, Scheduling } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

interface RevenueListProps {
    filteredSchedulings: Scheduling[]
    filteredExpenses: Expense[]
}

export default function RevenueList({ filteredSchedulings, filteredExpenses }: RevenueListProps) {

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Entypo name="flickr-with-circle" size={16} color='darkgreen' />
                    <Text style={styles.title}>Receita</Text>
                </View>
                <Text>{moneyFormat(getSchedulingsRevenue(filteredSchedulings))}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Entypo name="flickr-with-circle" size={16} color='darkred' />
                    <Text style={styles.title}>Despesa</Text>
                </View>
                <Text>{moneyFormat(getExpenses(filteredExpenses))}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    <Entypo name="flickr-with-circle" size={16} color='darkblue' />
                    <Text style={styles.title}>Lucro</Text>
                </View>
                <Text>{moneyFormat(getProfit(filteredSchedulings, filteredExpenses))}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginStart: 2
    }
})