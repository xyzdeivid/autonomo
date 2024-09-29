import { Scheduling } from '@/context/DocsContext'

export const orderSchedulings = (schedulings: Scheduling[]) => {

    return schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
    
}