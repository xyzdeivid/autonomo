import { Scheduling, Service } from '@/context/DocsContext'

export const orderSchedulings = (entries: Scheduling[]) => {

    const days: Scheduling[][] = []

    const entriesWithCustomer = entries.filter(current => 
        current.customer
    )

    const entriesWithoutCustomer = entries.filter(current => 
        !current.customer
    )

    // Inserindo entradas no dia correspondente
    const findDays = (current: Scheduling) => {
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