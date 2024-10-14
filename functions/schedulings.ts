import { Scheduling, Service } from '@/context/DocsContext'

export const orderSchedulings = (schedulings: Scheduling[]) => {

    return schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
    
}

export const getSchedulingValue = (service: Service, amount: number, value: number) => {
    if (service.category !== 'budget') {
        return service.amount ? service.value * amount : service.value
    }
    return value
}