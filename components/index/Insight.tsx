import { View } from 'react-native'
import { InsightSelectionButtons } from './InsightSelectionButtons'
import { useState } from 'react'
import { Hr } from './Hr'
import { MonthlyFinanceContent } from './MonthlyFinanceContent'
import { DailyFinanceContent } from './DailyFinanceContent'

export function Insight() {

    const [insightToShow, setInsightToShow] = useState('monthly')

    const getContent = () => {

        switch (insightToShow) {

            case 'monthly':
                return <MonthlyFinanceContent />

            case 'daily':
                return <DailyFinanceContent />
        }

    }

    return (
        <View style={{ marginHorizontal: 24 }}>
            <InsightSelectionButtons
                insightToShow={insightToShow}
                setInsightToShow={setInsightToShow}
            />
            <Hr />
            {getContent()}
        </View>
    )

}