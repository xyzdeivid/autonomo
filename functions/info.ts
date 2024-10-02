import { Scheduling } from '@/context/DocsContext'

export const getDays = (filteredSchedulings: Scheduling[]) => {

    let days: string[] = []

    // Selecting only days in strings
    days = filteredSchedulings.map(current => {
        return current.date.split('-')[2]
    }).sort((a, b) => parseInt(a) - parseInt(b))

    // not allowing days to repeat themselves
    const uniqueDays = [...new Set(days)]

    // putting in the correct format
    const formatDays = uniqueDays.map(current => {
        return {
            day: current,
            amount: 0
        }
    })

    // incrementing values per day
    formatDays.forEach(day => {
        filteredSchedulings.forEach(scheduling => {
            if (scheduling.date.split('-')[2] === day.day) {
                day.amount += scheduling.service.value
            }
        })
    })

    return formatDays

}