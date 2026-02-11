import { View, Text, StyleSheet, Pressable, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'
import { WhichProductToChooseHelpCard } from './WhichProductToChooseHelpCard'
import { useEffect, useRef, useState } from 'react'
import { colors } from '@/styles/appColors'
import { ProductCategoryButton } from './ProductCategoryButton'
import { useGetTheme } from '@/hooks/common/useGetTheme'

const { height } = Dimensions.get('window')

interface ItemsCategoriesFormProps {
    setShowItemCategoryCard: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setShowAddItemForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function ItemCategoryCard({ setShowItemCategoryCard, setCategory, setShowAddItemForm }: ItemsCategoriesFormProps) {

    const theme = useGetTheme()

    const slideAnim = useRef(new Animated.Value(height)).current
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start()
    }, [fadeAnim, slideAnim])

    function closeForm(close: boolean) {

        if (close) setShowItemCategoryCard(false)

    }

    function goToAddItemForm(categorySelected: string) {

        setCategory(categorySelected)
        setShowAddItemForm(true)

    }

    const [showHelpCard, setShowHelpCard] = useState(false)

    return (
        <TouchableWithoutFeedback onPress={() => closeForm(true)}>
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: colors.items.midMin, opacity: fadeAnim }
                ]}
            >
                <TouchableWithoutFeedback onPress={() => closeForm(false)}>
                    <Animated.View
                        style={[
                            styles.body,
                            { backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light },
                            { transform: [{ translateX: slideAnim }] }
                        ]}
                    >
                        <Text style={{ ...styles.title, color: theme === 'dark' ? '#FFF' : colors.items.max }}>
                            Escolha a categoria do seu novo item de trabalho!
                        </Text>
                        <View style={{ gap: 8 }}>
                            <ProductCategoryButton
                                categoryName='Produto para venda.'
                                categoryEx='Ex: Roupa, comida, eletrônico, etc.'
                                onPress={() => goToAddItemForm('product')}
                            />
                            <ProductCategoryButton
                                categoryName='Serviço com preço fixo.'
                                categoryEx='Ex: Corte de cabelo, maquiagem, manicure, etc.'
                                onPress={() => goToAddItemForm('service')}
                            />
                            <ProductCategoryButton
                                categoryName='Serviço com preço variável.'
                                categoryEx='Ex: Conserto, pintura, etc.'
                                onPress={() => goToAddItemForm('budget')}
                            />
                        </View>
                        <View style={styles.helpContainer}>
                            <Text style={{ color: theme === 'dark' ? '#FFF' : '#000' }}>Precisa de ajuda para escolher?</Text>
                            <Pressable
                                style={{
                                    backgroundColor: colors.items.max,
                                    padding: 6,
                                    alignSelf: 'center',
                                    borderRadius: 4,
                                    marginTop: 6
                                }}
                                onPress={() => setShowHelpCard(true)}
                            >
                                <Text style={{ color: 'white' }}>Clique aqui!</Text>
                            </Pressable>
                        </View>
                        {
                            showHelpCard && (
                                <WhichProductToChooseHelpCard setShowHelpCard={setShowHelpCard} />
                            )
                        }
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.items.min,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    body: {
        borderRadius: 10,
        padding: 16,
        margin: 20
    },

    title: {
        fontSize: 16,
        marginBottom: 16,
        fontWeight: '500',
        textAlign: 'center'
    },

    helpContainer: {
        marginTop: 16,
        alignSelf: 'center'
    }

})