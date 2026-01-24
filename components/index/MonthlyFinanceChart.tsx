import { Entry, Outflow } from '@/types'
import { findGreaterData } from '@/utils/info'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { useEffect, useRef } from 'react'
import { moneyFormat } from '@/utils/common'
import { calculateMonthlyIncome, calculateMonthlyExpenses, calculateMonthlyProfit } from '@/rules/indexRules'


interface MonthlyFinanceChartProps {
    filteredSchedulings: Entry[]
    filteredExpenses: Outflow[]
}

export function MonthlyFinanceChart({
    filteredSchedulings,
    filteredExpenses
}: MonthlyFinanceChartProps) {

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

    const animatedValues = useRef<Animated.Value[]>([])

    if (animatedValues.current.length !== bars.length) {
        animatedValues.current = bars.map(
            (_, index) => animatedValues.current[index] || new Animated.Value(0)
        )
    }

    useEffect(() => {

        animatedValues.current.forEach(anim => anim.setValue(0))

        Animated.stagger(
            120,
            animatedValues.current.map(anim =>
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: false
                })
            )
        ).start()

    }, [bars.length, revenue, expenses, profit])


    return (
        <View style={styles.chart}>
            {bars.map((bar: any, index) => {
                const heightPercent = (bar.value / maxValue) * 100
                const animatedHeight = animatedValues.current[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${heightPercent}%`]
                })
                return (
                    <View key={index} style={styles.barWrapper}>
                        <View style={styles.barContainer}>
                            <Text style={{ color: bar.capColor, fontWeight: '500', textAlign: 'center' }}>{moneyFormat(bar.value)}</Text>
                            <Animated.View
                                style={[
                                    styles.bar,
                                    {
                                        height: animatedHeight,
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
                                <Text style={styles.barLabel}>
                                    {bar.label}
                                </Text>
                            </Animated.View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({

    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 200,
        gap: 16,
        backgroundColor: '#F5F7F8',
        paddingTop: 36,
        marginHorizontal: 24,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0000001A'
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

    barLabel: {
        position: 'absolute',
        bottom: 6,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFFFFF',
    }

})