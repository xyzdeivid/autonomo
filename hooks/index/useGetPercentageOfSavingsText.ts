import useGetPercentageOfMonthlyRevenueSavings from './useGetPercentageOfMonthlyRevenueSavings'
import { useIsTheCurrentMonth } from './useIsTheCurrentMonth'

export function useGetPercentageOfSavingsText() {

    const currentMonth = useIsTheCurrentMonth()

    const percentageOfSavings = useGetPercentageOfMonthlyRevenueSavings()

    if (currentMonth) {
        return `Você está economizando ${percentageOfSavings}% da sua receita.`
    }

    return `Você economizou ${percentageOfSavings}% da sua receita.`

}