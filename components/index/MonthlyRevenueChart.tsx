import { Entry, Outflow } from '@/types'
import { getExpenses, getProfit, getSchedulingsRevenue } from '@/utils/revenue'
import { findGreaterData } from '@/utils/info'
import { View, StyleSheet, Animated, Text } from 'react-native'
import { useEffect, useRef } from 'react'
import { moneyFormat } from '@/utils/common'


interface RevenueChartProps {
    filteredSchedulings: Entry[]
    filteredExpenses: Outflow[]
}

export default function RevenueChart({
    filteredSchedulings,
    filteredExpenses
}: RevenueChartProps) {

    const revenue = getSchedulingsRevenue(filteredSchedulings)
    const expenses = getExpenses(filteredExpenses)
    const profit = getProfit(filteredSchedulings, filteredExpenses)

    const maxValue = findGreaterData(filteredSchedulings, filteredExpenses)

    const bars = [
        revenue > 0 && {
            value: revenue,
            color: '#009900',
            capColor: '#006600'
        },
        expenses > 0 && {
            value: expenses,
            color: '#990000',
            capColor: '#660000'
        },
        profit > 0 && {
            value: profit,
            color: '#1D4ED8', // 1D4ED8
            capColor: '#1E3A8A'
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
        <View style={styles.container}>
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
                                </Animated.View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingTop: 32,
        backgroundColor: '#F5F7F8',
        marginHorizontal: 24,
        borderRadius: 12
    },

    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 200,
        gap: 16
    },

    barWrapper: {
        alignItems: 'center',
        width: 68
    },

    barContainer: {
        height: '100%',
        justifyContent: 'flex-end'
    },

    bar: {
        width: 68,
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
    }


})