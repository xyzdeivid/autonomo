import { colors } from '@/styles/appColors'
import { Item } from '@/types'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native'

interface ProductOptionsInputProps {
    product: Item
    setProduct: React.Dispatch<React.SetStateAction<Item>>
    products: Item[]
}

export default function ProductOptionsInput({
    product,
    setProduct,
    products
}: ProductOptionsInputProps) {

    return (
        <View
            style={{
                borderRadius: 6,
                overflow: 'hidden',
                backgroundColor: colors.outflows.max,
                marginBottom: 20
            }}
        >
            <Picker
                selectedValue={product}
                onValueChange={itemValue => setProduct(itemValue)}
                dropdownIconColor="white"
                style={{
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
        </View>
    )
}
