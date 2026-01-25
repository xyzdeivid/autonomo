import { View, StyleSheet } from 'react-native'
import InfoTitle from './InfoTitle'
import { InsightSelectionButtons } from './InsightSelectionButtons'
import { MonthlyFinanceChart } from './MonthlyFinanceChart'
import { DailyFinanceChart } from './DailyFinanceChart'
import { Entry, Outflow } from '@/types'
import { useState } from 'react'
import { Hr } from './Hr'

interface InsightProps {
    filteredIncomes: Entry[]
    filteredExpenses: Outflow[]
}

export function Insight({ filteredIncomes, filteredExpenses }: InsightProps) {

    const [insightToShow, setInsightToShow] = useState('monthly')

    const getContent = () => {

        switch (insightToShow) {

            case 'monthly':
                return <MonthlyFinanceChart
                    filteredSchedulings={filteredIncomes}
                    filteredExpenses={filteredExpenses}
                />

            case 'daily':
                return <DailyFinanceChart
                    filteredIncomes={filteredIncomes}
                />

        }

    }

    function getTitle(): string {
        if (insightToShow === 'monthly') return 'Finanças Gerais'
        return 'Receita Diária'
    }

    return (
        <>
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
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F5F7F8',
        marginHorizontal: 24,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#0000001A',
        height: 300,
        justifyContent: 'center',
        overflow: 'hidden'
    }

})