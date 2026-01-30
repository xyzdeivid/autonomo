import useGetPercentageOfMonthlyRevenueSavings from './useGetPercentageOfMonthlyRevenueSavings'

export function useShowMonthTextInsights() {

    return useGetPercentageOfMonthlyRevenueSavings() > 0

}