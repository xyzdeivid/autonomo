import { View } from 'react-native'
import { InsightSelectionButtons } from './InsightSelectionButtons'
import { useState } from 'react'
import { Hr } from './Hr'
import { MonthlyFinanceContent } from './MonthlyFinanceContent'
import { DailyFinanceContent } from './DailyFinanceContent'
import { ItemsContent } from './ItemsContent'
import { CustomersContent } from './CustomersContent'

export function Insight() {

    const [insightToShow, setInsightToShow] = useState('monthly')
    const [comingFrom, setComingFrom] = useState('')

    const getContent = () => {

        switch (insightToShow) {

            case 'monthly':
                return <MonthlyFinanceContent
                    setComingFrom={setComingFrom}
                />

            case 'daily':
                return <DailyFinanceContent
                    comingFrom={comingFrom}
                    setComingFrom={setComingFrom}
                />

            case 'items':
                return <ItemsContent
                    comingFrom={comingFrom}
                    setComingFrom={setComingFrom}
                />

            case 'customers':
                return <CustomersContent
                    setComingFrom={setComingFrom}
                />
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