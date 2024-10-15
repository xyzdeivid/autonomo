import { View } from 'react-native'
import SelectCategoryInput from './SelectCategoryInput'
import ServicesList from './ServicesList'
import AnyItemWarning from '../common/AnyItemWarning'

import { getServicesByCategory } from '@/functions/services'
import { Service } from '@/context/DocsContext'

interface ServicesContentProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    services: Service[]
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ServicesContent({ category, setCategory,
    services, setServiceForDeletion, setDeleteServiceForm }: ServicesContentProps) {

    const getServiceOrProductName = () => {
        switch (category) {
            case 'product':
                return 'produto'
            case 'service':
                return 'serviço'
            case 'budget':
                return 'orçamentário'
        }
    }

    return (
        <View>
            <SelectCategoryInput category={category} setCategory={setCategory} />
            {
                services[0]
                    ? <ServicesList
                        setServiceForDeletion={setServiceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                        services={services}
                    />
                    : <AnyItemWarning text={`Nenhum ${getServiceOrProductName()} cadastrado`} />
            }
        </View>
    )

}