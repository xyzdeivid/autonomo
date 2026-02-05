import { DocsContext } from '@/context/DocsContext'
import { useContext } from 'react'

export function useGetAvailableMonths() {

    const appDocs = useContext(DocsContext)
    const [entries] = appDocs.entries
    const [outflows] = appDocs.outflows

    const uniqueYearMonths = new Set<string>()

    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
    const currentYear = new Date().getFullYear()

    const currentMonthYear = `${currentYear}-${currentMonth}`

    uniqueYearMonths.add(currentMonthYear)

    for (const entry of entries) {

        const [year, month] = entry.date.split('-')

        if (currentMonthYear !== `${year}-${month}`) {
            uniqueYearMonths.add(`${year}-${month}`)
        }

    }

    for (const outflow of outflows) {

        const [year, month] = outflow.date.split('-')

        if (currentMonthYear !== `${year}-${month}`) {
            uniqueYearMonths.add(`${year}-${month}`)
        }

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