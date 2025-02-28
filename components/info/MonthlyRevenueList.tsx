import { Outflow, Entry } from '@/context/DocsContext'
import { moneyFormat } from '@/functions/common'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/functions/revenue'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface RevenueListProps {
    filteredSchedulings: Entry[]
    filteredExpenses: Outflow[]
}

export default function RevenueList({ filteredSchedulings, filteredExpenses }: RevenueListProps) {

    const checkProfit = () => {
        return getProfit(filteredSchedulings, filteredExpenses) > 0
            ? ['#000066', '#000099', '#CCCCFF']
            : ['#CC0000', '#FF0000', '#FFCCCC']
    }

    return (
        <View style={styles.container}>
            {
                getSchedulingsRevenue(filteredSchedulings) > 0 && (
                    <View
                        style={{
                            ...styles.infoContainer,
                            borderColor: '#009900',
                            backgroundColor: '#006600'
                        }}
                    >
                        <View style={styles.label}>
                            <FontAwesome6 name='circle-dot' size={12} color='#CCFFCC' />
                            <Text style={{ ...styles.title, color: '#CCFFCC' }}>Receita</Text>
                        </View>
                        <Text style={{ color: '#CCFFCC' }}>{moneyFormat(getSchedulingsRevenue(filteredSchedulings))}</Text>
                    </View>
                )
            }
            {
                getExpenses(filteredExpenses) > 0 && (
                    <View
                        style={{
                            ...styles.infoContainer,
                            backgroundColor: '#660000',
                            borderColor: '#990000'
                        }}
                    >
                        <View style={styles.label}>
                            <FontAwesome6 name='circle-dot' size={12} color='#FFCCCC' />
                            <Text style={{ ...styles.title, color: '#FFCCCC' }}>Despesa</Text>
                        </View>
                        <Text style={{ color: '#FFCCCC' }}>{moneyFormat(getExpenses(filteredExpenses))}</Text>
                    </View>
                )
            }
            {getProfit(filteredSchedulings, filteredExpenses) !== 0 && (
                <View
                    style={{
                        ...styles.infoContainer,
                        backgroundColor: checkProfit()[0],
                        borderColor: checkProfit()[1]
                    }}
                >
                    <View style={styles.label}>
                        <FontAwesome6 name='circle-dot' size={12} color={checkProfit()[2]} />
                        <Text style={{ ...styles.title, color: checkProfit()[2] }}>Saldo</Text>
                    </View>
                    <Text style={{ color: checkProfit()[2] }}>{moneyFormat(getProfit(filteredSchedulings, filteredExpenses))}</Text>
                </View>

            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 2
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        marginStart: 4
    }
})