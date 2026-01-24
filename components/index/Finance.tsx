import { StyleSheet, View } from 'react-native'

import { useState } from 'react'
import { MonthlyFinance } from './MonthlyFinance'
import { DailyFinance } from './DailyFinance'
import InfoTitle from './InfoTitle'
import FinancePeriodButtons from './FinancePeriodButtons'
import { Hr } from './Hr'

export function Finance() {

    const [period, setPeriod] = useState('monthly')

    const getContent = () => {
        switch (period) {
            case 'monthly':
                return <MonthlyFinance />
            case 'daily':
                return <DailyFinance />
        }
    }

    function getTitle(): string {
        if (period === 'monthly') return 'Finanças Gerais'
        return 'Receita Diária'
    }

    return (
        <View>
            <InfoTitle text={getTitle()} />
            <FinancePeriodButtons
                period={period}
                setPeriod={setPeriod}
            />
            <Hr />
            <View style={{
                ...styles.container,
                paddingTop: period === 'monthly' ? 32 : 0,
                paddingBottom: period === 'monthly' ? 8 : 0
            }}>
                {getContent()}
            </View>
        </View>
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