import { DocsContext } from '@/context/DocsContext'
import { getAvailableYears } from '@/utils/info'
import { useContext } from 'react'

export default function useShowYearButton() {

    const [entries] = useContext(DocsContext).entries
    const availableYears = getAvailableYears(entries)

    return availableYears.length > 1

}