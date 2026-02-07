import { ScrollView, View } from 'react-native'
import { InsightSelectionButtons } from './InsightSelectionButtons'
import { useState } from 'react'
import { MonthlyFinanceContent } from './MonthlyFinanceContent'
import { DailyFinanceContent } from './DailyFinanceContent'
import { ItemsContent } from './ItemsContent'
import { CustomersContent } from './CustomersContent'
import { AmountContent } from './AmountContent'

export function Insight() {

    const [insightToShow, setInsightToShow] = useState('monthly')
    const [comingFrom, setComingFrom] = useState(0)

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
                    comingFrom={comingFrom}
                    setComingFrom={setComingFrom}
                />

            case 'amount':
                return <AmountContent
                    setComingFrom={setComingFrom}
                />
        }

    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            persistentScrollbar
        >
            <InsightSelectionButtons
                insightToShow={insightToShow}
                setInsightToShow={setInsightToShow}
            />

            <View style={{ marginTop: 12 }}>
                {getContent()}
            </View>
        </ScrollView>
    )

}