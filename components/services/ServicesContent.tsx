import { View } from 'react-native'
import SelectCategoryInput from './SelectCategoryInput'
import ServicesList from './ServicesList'
import AnyItemWarning from '../common/AnyItemWarning'

import { getServicesByCategory } from '@/functions/services'
import { Service } from '@/context/DocsContext'

interface ServicesContentProps {
    category: number
    setCategory: React.Dispatch<React.SetStateAction<number>>
    services: Service[]
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ServicesContent({ category, setCategory,
    services, setServiceForDeletion, setDeleteServiceForm }: ServicesContentProps) {

    const getServiceOrProductName = () => {
        if (category === 1) {
            return 'produto'
        }
        return 'serviço'
    }

    return (
        <View>
            <SelectCategoryInput category={category} setCategory={setCategory} />
            {
                getServicesByCategory(services, category)[0]
                    ? <ServicesList
                        setServiceForDeletion={setServiceForDeletion}
                        setDeleteServiceForm={setDeleteServiceForm}
                        services={getServicesByCategory(services, category)}
                    />
                    : <AnyItemWarning text={`Nenhum ${getServiceOrProductName()} cadastrado`} />
            }
        </View>
    )

}