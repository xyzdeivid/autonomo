import { moneyFormat } from '@/utils/common'
import { useGetAverageRevenuePerWorkingDay } from './useGetAverageRevenuePerWorkingDay'
import { useIsTheCurrentMonth } from './useIsTheCurrentMonth'

export function useGetAverageRevenuePerWorkingDayText() {

    const currentMonth = useIsTheCurrentMonth()

    const averageRevenuePerWorkingDay = useGetAverageRevenuePerWorkingDay()

    if (currentMonth) {
        return `Você está faturando em média ${moneyFormat(averageRevenuePerWorkingDay)} por dia de trabalho.`
    }

    return `Você faturou em média ${moneyFormat(averageRevenuePerWorkingDay)} por dia de trabalho.`

}