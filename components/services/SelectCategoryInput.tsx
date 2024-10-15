import { Picker } from '@react-native-picker/picker'

interface SelectCategoryInputProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectCategoryInput({ category, setCategory }: SelectCategoryInputProps) {

    const categories = [
        ['Produtos', 'product'],
        ['Serviços', 'service'],
        ['Orçamentários', 'budget']
    ]

    return (
        <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
        >
            {categories.map((current, index) => {
                return (
                    <Picker.Item key={current[0]} label={current[0]} value={current[1]} />
                )
            })}
        </Picker>
    )

}