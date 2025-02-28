import { DocsContext, Item } from '@/context/DocsContext'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'

interface ProductOptionsInputProps {
    product: Item
    setProduct: React.Dispatch<React.SetStateAction<Item>>
    products: Item[]
}

export default function ProductOptionsInput({ product, setProduct, products }: ProductOptionsInputProps) {

    const [items] = useContext(DocsContext).items

    return (
        <Picker
            selectedValue={product}
            onValueChange={itemValue => setProduct(itemValue)}
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
                    value={product}
                />
            ))}
        </Picker>
    )
}