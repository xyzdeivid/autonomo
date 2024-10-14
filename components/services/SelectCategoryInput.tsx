import { Picker } from '@react-native-picker/picker'

interface SelectCategoryInputProps {
    category: number
    setCategory: React.Dispatch<React.SetStateAction<number>>
}

export default function SelectCategoryInput({ category, setCategory }: SelectCategoryInputProps) {

    const categories = [
        'Produtos',
        'Serviços',
        'Serviços Orçamentários'
    ]

    return (
        <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
        >
            {categories.map((current, index) => {
                return (
                    <Picker.Item key={current} label={current} value={index} />
                )
            })}
        </Picker>
    )

}