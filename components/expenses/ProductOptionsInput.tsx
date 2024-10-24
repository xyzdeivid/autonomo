import { Service } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'

interface ProductOptionsInputProps {
    products: Service[]
    setProduct: React.Dispatch<React.SetStateAction<string>>
}

export default function ProductOptionsInput({ products, setProduct }: ProductOptionsInputProps) {

    return (
        <Picker
            selectedValue={products[0]._id}
            onValueChange={(itemValue) => setProduct(itemValue)}
            dropdownIconColor='#660000'
            style={{
                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                marginBottom: 20
            }}
        >
            {products.map(product => (
                <Picker.Item
                    key={product._id}
                    label={product._id}
                    value={product._id}
                />
            ))}
        </Picker>
    )
}