import { View } from 'react-native'

import { useState } from 'react'
import FinancePeriodButtons from './FinancePeriodButtons'
import MonthlyRevenue from './MonthlyRevenue'
import Daily from './Daily'

export default function Revenue() {
    
    const [period, setPeriod] = useState('monthly')

    const getContent = () => {
        switch (period) {
            case 'monthly':
                return <MonthlyRevenue />
            case 'daily':
                return <Daily />
        }
    }

    return (
        <View style={{ zIndex: -1 }}>
            <FinancePeriodButtons period={period} setPeriod={setPeriod} />
            {getContent()}
        </View>
    )
}