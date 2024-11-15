import { View } from 'react-native'
import SelectCategoryInput from './SelectCategoryInput'
import ServicesList from './ServicesList'

import { DocsContext, Service } from '@/context/DocsContext'
import { useContext } from 'react'

interface ServicesContentProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    services: Service[]
    setServiceForDeletion: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ServicesContent({ category, setCategory,
    services, setServiceForDeletion, setDeleteServiceForm }: ServicesContentProps) {

    const [allServices] = useContext(DocsContext).services

    const categoriesNumber = () => {

        const categories: string[] = []

        allServices.forEach(service => {

            if (!categories.find(category => category === service.category)) {
                categories.push(service.category)
            }

        })

        return categories.length

    }

    return (
        <View>
            {categoriesNumber() > 1 && (
                <SelectCategoryInput category={category} setCategory={setCategory} />
            )}
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