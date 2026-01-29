import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'

export function useIsTheCurrentMonth() {

    const actualYear = String(new Date().getFullYear())
    const actualMonth = new Date().getMonth()

    const appDocs = useContext(DocsContext)
    const [currentYear] = appDocs.currentYear
    const [selectedMonth] = appDocs.selectedMonth

    if (currentYear === actualYear && selectedMonth === actualMonth + 1) {
        return true
    }

    return false

}