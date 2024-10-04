import { Service } from "@/context/DocsContext";

export const orderServices = (services: Service[]) => {

    return services.sort((a, b) => b.value - a.value)

}

export const checkTitle = (service: Service) => {
    if (service.amount) {
        return 'Produto'
    } else {
        return 'Serviço'
    }
}