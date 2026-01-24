import { View } from 'react-native'

import { useState } from 'react'
import { MonthlyFinance } from './MonthlyFinance'
import { DailyFinance } from './DailyFinance'

export function Finance() {

    const [period, setPeriod] = useState('monthly')

    const getContent = () => {
        switch (period) {
            case 'monthly':
                return <MonthlyFinance period={period} setPeriod={setPeriod} />
            case 'daily':
                return <DailyFinance period={period} setPeriod={setPeriod} />
        }
    }

    return (
        <View>
            {getContent()}
        </View>
    )
}