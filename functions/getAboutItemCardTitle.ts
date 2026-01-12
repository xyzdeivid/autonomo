export const getAboutItemCardTitle = (category: string) => {


    switch (category) {

        case 'product':
            return 'Produto'

        case 'service':
            return 'Serviço'

        case 'budget':
            return 'Orçamentário'

    }

}