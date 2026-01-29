import { useGetAvailableMonths } from './useGetAvailableMonths'

export function useShowMonths() {

    return useGetAvailableMonths().length > 1

}