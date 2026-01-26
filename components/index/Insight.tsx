import { View, StyleSheet, Text } from 'react-native'
import InfoTitle from './InfoTitle'
import { InsightSelectionButtons } from './InsightSelectionButtons'
import { MonthlyFinanceChart } from './MonthlyFinanceChart'
import { DailyFinanceChart } from './DailyFinanceChart'
import { useState } from 'react'
import { Hr } from './Hr'
import useGetPercentageOfMonthlyRevenueSavings from '@/hooks/index/useGetPercentageOfMonthlyRevenueSavings'
import AntDesign from '@expo/vector-icons/AntDesign'

export function Insight() {

    const [insightToShow, setInsightToShow] = useState('monthly')

    const getContent = () => {

        switch (insightToShow) {

            case 'monthly':
                return <MonthlyFinanceChart
                />

            case 'daily':
                return <DailyFinanceChart
                />

        }

    }

    function getTitle(): string {
        if (insightToShow === 'monthly') return 'Finanças Gerais'
        return 'Receita Diária'
    }

    const percentageOfSavings = useGetPercentageOfMonthlyRevenueSavings()

    return (
        <View style={{ marginHorizontal: 24 }}>
            <InsightSelectionButtons
                insightToShow={insightToShow}
                setInsightToShow={setInsightToShow}
            />
            <InfoTitle text={getTitle()} />
            <Hr />
            <View style={{
                ...styles.container,
                paddingTop: insightToShow === 'monthly' ? 32 : 0,
                paddingBottom: insightToShow === 'monthly' ? 8 : 0
            }}>
                {getContent()}
            </View>
            {
                insightToShow === 'monthly' && (
                    <View style={styles.insightTextContainer}>
                        <AntDesign name='exclamation-circle' size={12} color='#000000CC' />
                        <Text style={styles.insightText}>Você está economizando {percentageOfSavings}% da sua receita.</Text>
                    </View>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F5F7F8',
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0000001A',
        height: 300,
        justifyContent: 'center',
        overflow: 'hidden'
    },

    insightTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },

    insightText: {
        fontStyle: 'italic',
        color: 'gray',
        marginStart: 4,
        marginBottom: 1
    }

})