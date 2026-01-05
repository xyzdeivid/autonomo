import { View, Text, StyleSheet } from 'react-native'
import ServiceOrProductButtons from './ServiceOrProductButtons'

interface ItemsCategoriesFormProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ItemsCategoriesForm({ choice, setChoice }: ItemsCategoriesFormProps) {
    return (
        <View>
            <Text style={styles.title}>
                1. Selecione a categoria:
            </Text>
            <ServiceOrProductButtons choice={choice} setChoice={setChoice} />
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