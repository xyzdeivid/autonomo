import { useGetAvailableMonths } from './useGetAvailableMonths'

export default function useShowYearButton() {

    return useGetAvailableMonths().length > 1

}