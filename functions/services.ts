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
            return 'Serviço Orçamentário'
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

export const getServicesByCategory = (services: Service[], category: number) => {

    if (category === 1) {

        return services.filter(service =>
            service.category === 'service'
        )

    } else if (category === 2) {

        return services.filter(service =>
            service.category === 'budget'
        )

    }

    return services.filter(service =>
        service.category === 'product'
    )

}