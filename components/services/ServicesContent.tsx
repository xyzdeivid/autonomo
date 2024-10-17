import { View } from 'react-native'
import SelectCategoryInput from './SelectCategoryInput'
import ServicesList from './ServicesList'

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

    return (
        <View>
            <SelectCategoryInput category={category} setCategory={setCategory} />
            {services[0] && (
                <ServicesList
                    setServiceForDeletion={setServiceForDeletion}
                    setDeleteServiceForm={setDeleteServiceForm}
                    services={services}
                />
            )}
        </View>
    )

}