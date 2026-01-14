import { View, Text, StyleSheet, Pressable } from 'react-native'
import CardWhichProductToChoose from './CardWhichProductToChoose'
import { useState } from 'react'

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
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: '#6600CC1A',
                    }}
                    onPress={() => {
                        setCategory('product')
                        setStep(1)
                    }}
                >
                    <Text
                        style={{
                            ...styles.infoText,
                            color: '#6600CC',
                        }}
                    >
                        Produto para venda.
                    </Text>
                    <Text
                        style={styles.exampleText}
                    >
                        Ex: Roupa, comida, eletrônico, etc.
                    </Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: '#6600CC1A'
                    }}
                    onPress={() => {
                        setCategory('service')
                        setStep(1)
                    }}
                >
                    <Text
                        style={{
                            ...styles.infoText,
                            color: '#6600CC'
                        }}
                    >
                        Serviço com preço fixo.
                    </Text>
                    <Text
                        style={styles.exampleText}
                    >
                        Ex: Corte de cabelo, maquiagem, manicure, etc.
                    </Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: '#6600CC1A'
                    }}
                    onPress={() => {
                        setCategory('budget')
                        setStep(1)
                    }}
                >
                    <Text
                        style={{
                            ...styles.infoText,
                            color: '#6600CC'
                        }}
                    >
                        Serviço com preço variável.
                    </Text>
                    <Text
                        style={styles.exampleText}
                    >
                        Ex: Conserto, pintura, etc.
                    </Text>
                </Pressable>
                <Text>Precisa de ajuda para escolher?</Text>
                <Pressable
                    style={{
                        backgroundColor: 'rgba(51, 0, 102, 0.75)',
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
        fontSize: 20,
        marginBottom: 16,
        color: '#330066',
        fontWeight: '500',
    },
    container: {
        marginBottom: 20
    },
    button: {
        padding: 12,
        borderRadius: 6,
        marginBottom: 24
    },
    infoText: {
        marginBottom: 6,
        fontSize: 16
    },
    exampleText: {
        backgroundColor: 'rgba(102, 0, 204, 0.75)',
        color: '#FFFFFF',
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start'
    }
})