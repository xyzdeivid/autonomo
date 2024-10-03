import { View } from 'react-native'
import InfoTitle from '../common/InfoTitle'
import DailyRevenueChart from './DailyRevenueChart'
import FinancePeriodButtons from './FinancePeriodButtons'

interface DailyRevenueProps {
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

export default function DailyRevenue({ period, setPeriod }: DailyRevenueProps) {

    return (
        <View>
            <InfoTitle text='Receita diária' />
            <DailyRevenueChart />
            <FinancePeriodButtons
                period={period}
                setPeriod={setPeriod}
                mgTop={16}
            />
        </View>
    )

}