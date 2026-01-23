import { View } from 'react-native'
import InfoTitle from './InfoTitle'
import DailyRevenueChart from './DailyRevenueChart'
import FinancePeriodButtons from './FinancePeriodButtons'
import { Hr } from './Hr'

interface DailyRevenueProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function DailyRevenue({ period, setPeriod }: DailyRevenueProps) {

    return (
        <View>
            <InfoTitle text='Receita diária' />
            <FinancePeriodButtons
                period={period}
                setPeriod={setPeriod}
            />
            <Hr />
            <DailyRevenueChart />
        </View>
    )

}