import { View } from 'react-native'

import { useState } from 'react'
import MonthlyRevenue from './MonthlyRevenue'
import DailyRevenue from './DailyRevenue'

export default function Revenue() {
    
    const [period, setPeriod] = useState('monthly')

    const getContent = () => {
        switch (period) {
            case 'monthly':
                return <MonthlyRevenue period={period} setPeriod={setPeriod} />
            case 'daily':
                return <DailyRevenue period={period} setPeriod={setPeriod} />
        }
    }

    return (
        <View>
            {getContent()}
        </View>
    )
}