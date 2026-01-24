import { View } from 'react-native'
import InfoTitle from './InfoTitle'
import { DailyFinanceChart } from './DailyFinanceChart'
import FinancePeriodButtons from './FinancePeriodButtons'
import { Hr } from './Hr'

interface DailyFinanceProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export function DailyFinance({ period, setPeriod }: DailyFinanceProps) {

    return (
        <View>
            <InfoTitle text='Receita diária' />
            <FinancePeriodButtons
                period={period}
                setPeriod={setPeriod}
            />
            <Hr />
            <DailyFinanceChart />
        </View>
    )

}