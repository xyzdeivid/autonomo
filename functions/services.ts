import { Service } from '@/context/DocsContext'

export const orderServices = (services: Service[]) => {

    return services.sort((a, b) => b.value - a.value)

}

export const checkServicesAmount = (services: Service[], service: Service) => {

    const servicesAmount = services.filter(current => {
        return current.category === service.category
    }).length

    if (servicesAmount === 8) {
        return false
    }

    return true

}

export const getServicesByCategory = (services: Service[], category: string) => {

    switch (category) {
        case 'product':
            return services.filter(service =>
                service.category === 'product'
            )
        case 'service':
            return services.filter(service =>
                service.category === 'service'
            )
        case 'budget':
            return services.filter(service =>
                service.category === 'budget'
            )
        default:
            return []
    }

}

export const getCategoryAndSet = (
    items: Service[],
    setCategory: React.Dispatch<React.SetStateAction<string>>
) => {
    if (items[0]) {
        setCategory(items[0].category)
    }
}

export const checkAllInputs = (
    choice: string, name: string, 
    value: number, amount: number
): boolean => {

    switch (choice) {

        case 'product':
            if (name && value && amount) return true
            return false

        case 'service':
            if (name && value) return true
            return false

        case 'budget':
            if (name) return true
            return false

        default:
            return false

    }

}

export const createNewService = (
    choice: string, name: string,
    value: number, amount: number
) => {
    return {
        category: choice,
        _id: name,
        value,
        amount
    }
}

export const checkIfThereIsAnotherService = (services: Service[], name: string): boolean => {

    const isThereAnotherService = services.filter(service => {
        const serviceName = service._id.toLocaleLowerCase()
        const nameToCompare = name.toLocaleLowerCase()
        return serviceName === nameToCompare
    })[0]

    return isThereAnotherService
        ? true
        : false

}

export const checkTitle = (item: string) => {
    switch (item) {
        case 'service':
            return 'Serviço'
        case 'product':
            return 'Produto'
        case 'budget':
            return 'Orçamentário'
    }
}