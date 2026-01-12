import { Item } from '@/types'
import { Picker } from '@react-native-picker/picker'

interface ProductOptionsInputProps {
    product: Item
    setProduct: React.Dispatch<React.SetStateAction<Item>>
    products: Item[]
}

export default function ProductOptionsInput({ product, setProduct, products }: ProductOptionsInputProps) {

    return (
        <Picker
            selectedValue={product}
            onValueChange={itemValue => setProduct(itemValue)}
            dropdownIconColor='white'
            style={{
                backgroundColor: 'rgba(139, 0, 0, 0.75)',
                marginBottom: 20,
                color: 'white'
            }}
        >
            {products.map(product => (
                <Picker.Item
                    key={product._id}
                    label={product._id}
                    value={product}
                />
            ))}
        </Picker>
    )
}