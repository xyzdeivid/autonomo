import { View, Text, StyleSheet, Pressable } from 'react-native'
import CardWhichProductToChoose from './CardWhichProductToChoose'
import { useState } from 'react'
import { colors } from '@/constants/appColors'
import { ProductCategoryButton } from './ProductCategoryButton'

interface ItemsCategoriesFormProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function ItemsCategoriesForm({ setCategory, setStep }: ItemsCategoriesFormProps) {

    const [showHelpCard, setShowHelpCard] = useState(false)

    return (
        <View>
            <Text style={styles.title}>
                Selecione a categoria:
            </Text>
            <View style={styles.container}>
                <ProductCategoryButton 
                    categoryName='Produto para venda.'
                    categoryEx='Ex: Roupa, comida, eletrônico, etc.'
                    onPress={() => {
                        setCategory('product')
                        setStep(1)
                    }}
                />
                <ProductCategoryButton 
                    categoryName='Serviço com preço fixo.'
                    categoryEx='Ex: Corte de cabelo, maquiagem, manicure, etc.'
                    onPress={() => {
                        setCategory('service')
                        setStep(1)
                    }}
                />
                <ProductCategoryButton 
                    categoryName='Serviço com preço variável.'
                    categoryEx='Ex: Conserto, pintura, etc.'
                    onPress={() => {
                        setCategory('budget')
                        setStep(1)
                    }}
                />
                <Text>Precisa de ajuda para escolher?</Text>
                <Pressable
                    style={{
                        backgroundColor: colors.items.max,
                        padding: 6,
                        alignSelf: 'flex-start',
                        borderRadius: 4,
                        marginTop: 6
                    }}
                    onPress={() => setShowHelpCard(true)}
                >
                    <Text style={{ color: 'white' }}>Clique aqui!</Text>
                </Pressable>
                {
                    showHelpCard && (
                        <CardWhichProductToChoose setShowHelpCard={setShowHelpCard} />
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 16,
        color: colors.items.max,
        fontWeight: '500',
    },
    container: {
        marginBottom: 20
    }
})