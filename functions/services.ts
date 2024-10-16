import { Service } from '@/context/DocsContext'

export const orderServices = (services: Service[]) => {

    return services.sort((a, b) => b.value - a.value)

}

export const checkTitle = (service: Service) => {
    switch (service.category) {
        case 'service':
            return 'Serviço'
        case 'product':
            return 'Produto'
        case 'budget':
            return 'Orçamentário'
    }
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