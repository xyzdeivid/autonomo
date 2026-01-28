import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'

export function useGetAvailableMonths() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries

    const uniqueYearMonths = new Set<string>()

    for (const entry of entries) {
        const [year, month] = entry.date.split('-')
        uniqueYearMonths.add(`${year}-${month}`)
    }

    const months = Array.from(uniqueYearMonths).map((ym) => {
        const [year, month] = ym.split('-')
        return { year, month }
    })

    months.sort((a, b) => {
        if (a.year !== b.year) {
            return Number(b.year) - Number(a.year)
        }
        return Number(b.month) - Number(a.month)
    })

    return months
}
