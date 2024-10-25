import { DocsContext } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'

interface SelectCategoryInputProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectCategoryInput({ category, setCategory }: SelectCategoryInputProps) {

    const [services] = useContext(DocsContext).services

    const categories = [
        ['Produtos', 'product'],
        ['Serviços', 'service'],
        ['Orçamentários', 'budget']
    ]

    const thereIsItem = (category: string) => {

        const item = services.find(item => (
            item.category === category
        ))

        if (item) return true
        return false

    }

    return (
        <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
            dropdownIconColor='#330066'
        >
            {
                categories.map((current) => (
                    thereIsItem(current[1]) && (
                        <Picker.Item key={current[0]} label={current[0]} value={current[1]} />
                    )
                ))
            }
        </Picker>
    )

}