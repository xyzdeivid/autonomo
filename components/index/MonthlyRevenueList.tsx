import { Outflow, Entry } from '@/types/index'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/utils/revenue'
import { StyleSheet, Text, View } from 'react-native'

interface RevenueListProps {
    filteredSchedulings: Entry[]
    filteredExpenses: Outflow[]
}

export default function RevenueList({ filteredSchedulings, filteredExpenses }: RevenueListProps) {

    const checkProfit = () => {
        return getProfit(filteredSchedulings, filteredExpenses) > 0
            ? '#1E3A8A'
            : '#CC0000'
    }

    return (
        <View style={styles.container}>
            {
                getSchedulingsRevenue(filteredSchedulings) > 0 && (
                    <View
                        style={{
                            ...styles.infoContainer,
                            backgroundColor: '#006600',
                            borderBottomLeftRadius: 8
                        }}
                    >
                        <Text style={styles.title}>Receita</Text>
                    </View>
                )
            }
            {
                getExpenses(filteredExpenses) > 0 && (
                    <View
                        style={{
                            ...styles.infoContainer,
                            backgroundColor: '#660000',
                        }}
                    >
                        <Text style={styles.title}>Despesa</Text>
                    </View>
                )
            }
            {getProfit(filteredSchedulings, filteredExpenses) > 0 && (
                <View
                    style={{
                        ...styles.infoContainer,
                        backgroundColor: checkProfit(),
                        borderBottomRightRadius: 8
                    }}
                >
                    <Text style={styles.title}>Saldo</Text>
                </View>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center'
    },
    infoContainer: {
        width: 68,
        paddingVertical: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },
    title: {
        fontWeight: 'bold',
        color: 'white'
    }
})