import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native'
import { moneyFormat } from '@/utils/common'
import { useEffect, useRef } from 'react'
import useGetMonthlyIncome from '@/hooks/index/useGetMonthlyIncome'
import useGetMonthlyExpenses from '@/hooks/index/useGetMonthlyExpenses'
import useGetMonthlyProfit from '@/hooks/index/useGetMonthlyProfit'

export function MonthlyFinanceChart() {

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(-screenWidth)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const revenue = useGetMonthlyIncome()
    const expenses = useGetMonthlyExpenses()
    const profit = useGetMonthlyProfit()

    const maxValue = revenue > expenses ? revenue : expenses

    const bars = [
        revenue > 0 && {
            value: revenue,
            color: '#009900',
            capColor: '#006600',
            label: 'Receita'
        },
        expenses > 0 && {
            value: expenses,
            color: '#990000',
            capColor: '#660000',
            label: 'Despesa'
        },
        profit > 0 && {
            value: profit,
            color: '#1D4ED8',
            capColor: '#1E3A8A',
            label: 'Saldo'
        }
    ].filter(Boolean)

    return (
        <View style={{ height: 300 }}>
            <Animated.View
            style={{
                flex: 1,
                transform: [{ translateX: slideAnim }]
            }}
        >
            <View style={styles.chart}>
                {bars.map((bar: any, index) => {
                    const heightPercent = (bar.value / maxValue) * 100
                    return (
                        <View key={index} style={styles.barWrapper}>
                            <View style={styles.barContainer}>
                                <Text style={{ color: bar.capColor, fontWeight: '500', textAlign: 'center' }}>
                                    {moneyFormat(bar.value)}
                                </Text>
                                <View
                                    style={[
                                        styles.bar,
                                        {
                                            height: `${heightPercent}%`,
                                            backgroundColor: bar.color
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.cap,
                                            { backgroundColor: bar.capColor }
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View style={styles.labelsContainer}>
                {revenue > 0 && <Text style={styles.label}>Receita</Text>}
                {expenses > 0 && <Text style={styles.label}>Despesa</Text>}
                {profit > 0 && <Text style={styles.label}>Saldo</Text>}
            </View>
        </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    chart: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 16
    },

    barWrapper: {
        alignItems: 'center',
        width: 72
    },

    barContainer: {
        height: '100%',
        justifyContent: 'flex-end',
        paddingTop: 18
    },

    bar: {
        width: 72,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'relative',
        overflow: 'hidden'
    },

    cap: {
        height: 8,
        width: '100%',
        position: 'absolute',
        top: 0
    },

    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 4
    },

    label: {
        width: 72,
        textAlign: 'center'
    }

})