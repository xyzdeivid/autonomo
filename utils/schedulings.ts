import { Entry, Item } from '@/types/index'
import { generateId } from './common'

export const orderSchedulings = (entries: Entry[]) => {

    const days: Entry[][] = []

    const entriesWithCustomer = entries.filter(current => 
        current.customer
    )

    const entriesWithoutCustomer = entries.filter(current => 
        !current.customer
    )

    // Inserindo entradas no dia correspondente
    const findDays = (current: Entry) => {
        const day = days.find((day) =>
            day.some((scheduling) => scheduling.date === current.date)
        )

        if (day) {

            day.push(current)

        } else {

            days.push([current])

        }
    }
    for (const entry of entriesWithCustomer) {
        findDays(entry)
    }
    for (const entry of entriesWithoutCustomer) {
        findDays(entry)
    }

    // Organizando dias por ordem alfabética
    days.forEach(day => {
        day.sort((a, b) => {
            if (a.customer && b.customer) {
                return a.customer.localeCompare(b.customer)
            }
            return 0
        })
    })

    // Organizando os dias de forma decrescente
    days.sort((a, b) => b[0].date.localeCompare(a[0].date))

    return days.flat()

}

export const getSchedulingValue = (service: Item, amount: number, value: number) => {
    if (service.category === 'product') {
        return service.value * amount
    }
    if (service.category === 'service') {
        return service.value
    }
    return value
}

export const getServices = (services: Item[]) => {

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

export const createNewEntry = (
    service: Item, amount: number,
    value: number, date: string, costumerName: string
) => {

    const newScheduling: Entry = {
        _id: generateId(),
        serviceId: service._id,
        serviceCategory: service.category,
        serviceValue: getSchedulingValue(service, amount, value),
        serviceIsThereAmount: service.isThereAmount,
        serviceAmount: amount,
        date,
        ...(costumerName && { customer: costumerName })
    }

    return newScheduling

}