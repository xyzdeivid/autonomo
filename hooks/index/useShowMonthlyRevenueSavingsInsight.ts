import useGetPercentageOfMonthlyRevenueSavings from './useGetPercentageOfMonthlyRevenueSavings'

export function useShowMonthlyRevenueSavingsInsight(insightToShow: string): boolean {

    const percentageOfMonthlyRevenueSavings = useGetPercentageOfMonthlyRevenueSavings()

    return insightToShow === 'monthly' && percentageOfMonthlyRevenueSavings > 0

}