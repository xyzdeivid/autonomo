import { Scheduling, Service } from '@/context/DocsContext'

export const orderSchedulings = (schedulings: Scheduling[]) => {

    return schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
    .sort((a, b) => {
        if (a.customer && b.customer) {
            return a.customer.localeCompare(b.customer)
        }
        return 0
    })
    
}

export const getSchedulingValue = (service: Service, amount: number, value: number) => {
    if (service.category === 'product') {
        return service.value * amount
    }
    if (service.category === 'service') {
        return service.value
    }
    return value
}

export const getServices = (services: Service[]) => {

    const products = services.filter(current => (
        current.category === 'product'
    ))

    const productsWithoutStock = products.filter(current => (
        !current.isThereAmount
    ))

    const productsWithStock = products.filter(current => (
        current.isThereAmount
    ))

    const servicesCategory = services.filter(service => (
        service.category === 'service'
    ))

    const budgetCategory = services.filter(service => (
        service.category === 'budget'
    ))

    const items = [...productsWithoutStock, ...servicesCategory, ...budgetCategory]

    productsWithStock.forEach(current => {
        if (current.amount) {
            items.push(current)
        }
    })

    return items


}