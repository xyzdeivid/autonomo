import { Entry, Outflow } from '@/types'
import { findGreaterData } from '@/utils/info'
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native'
import { moneyFormat } from '@/utils/common'
import { calculateMonthlyIncome, calculateMonthlyExpenses, calculateMonthlyProfit } from '@/rules/indexRules'
import { useEffect, useRef } from 'react'

interface MonthlyFinanceChartProps {
    filteredSchedulings: Entry[]
    filteredExpenses: Outflow[]
}

export function MonthlyFinanceChart({
    filteredSchedulings,
    filteredExpenses
}: MonthlyFinanceChartProps) {

    const screenWidth = Dimensions.get('window').width
    const slideAnim = useRef(new Animated.Value(-screenWidth)).current

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideAnim])

    const revenue = calculateMonthlyIncome(filteredSchedulings)
    const expenses = calculateMonthlyExpenses(filteredExpenses)
    const profit = calculateMonthlyProfit(filteredSchedulings, filteredExpenses)

    const maxValue = findGreaterData(filteredSchedulings, filteredExpenses)

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
        justifyContent: 'flex-end'
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
        top: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },

    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        paddingTop: 8
    },

    label: {
        width: 72,
        textAlign: 'center'
    }

})