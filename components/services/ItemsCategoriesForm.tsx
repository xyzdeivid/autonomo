import { View, Text, StyleSheet } from 'react-native'
import ServiceOrProductButtons from './ServiceOrProductButtons'

interface ItemsCategoriesFormProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function ItemsCategoriesForm({ category, setCategory }: ItemsCategoriesFormProps) {
    return (
        <View>
            <Text style={styles.title}>
                1. Selecione a categoria:
            </Text>
            <ServiceOrProductButtons category={category} setCategory={setCategory} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 16,
        color: '#330066',
        fontWeight: '500',
    },
})