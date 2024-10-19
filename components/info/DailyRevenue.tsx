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
            <View style={{
                width: '85%',
                height: 1,
                backgroundColor: 'lightgray',
                marginHorizontal: 'auto',
                marginTop: 20,
                marginBottom: 24
            }} />
            <FinancePeriodButtons
                period={period}
                setPeriod={setPeriod}
            />
        </View>
    )

}