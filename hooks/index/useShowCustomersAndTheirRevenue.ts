import { useGetCustomersAndTheirRevenueForTheMonth } from './useGetCustomersAndTheirRevenueForTheMonth'

export function useShowCustomersAndTheirRevenue() {

    const customers = useGetCustomersAndTheirRevenueForTheMonth()

    return customers.length > 0

}