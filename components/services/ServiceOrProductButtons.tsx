import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ServiceOrProductButtonsProps {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function ServiceOrProductButtons({ category, setCategory }: ServiceOrProductButtonsProps) {

    const checkChoice = (button: string) => {
        return category === button
            ? ['#6600CC', '#FFFFFF']
            : ['#6600CC1A', '#6600CC']
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    ...styles.button,
                    backgroundColor: checkChoice('product')[0],
                }}
                onPress={() => setCategory('product')}
            >
                <Text
                    style={{
                        ...styles.infoText,
                        color: checkChoice('product')[1],
                    }}
                >
                    Produto para venda.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Roupas, lanches, eletrônicos, etc.
                </Text>
            </Pressable>
            <Pressable
                style={{
                    ...styles.button,
                    backgroundColor: checkChoice('service')[0],
                }}
                onPress={() => setCategory('service')}
            >
                <Text
                    style={{
                        ...styles.infoText,
                        color: checkChoice('service')[1]
                    }}
                >
                    Serviço com preço fixo.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Cortes de cabelo, maquiagens, manicure, etc.
                </Text>
            </Pressable>
            <Pressable
                style={{
                    ...styles.button,
                    backgroundColor: checkChoice('budget')[0]
                }}
                onPress={() => setCategory('budget')}
            >
                <Text
                    style={{
                        ...styles.infoText,
                        color: checkChoice('budget')[1]
                    }}
                >
                    Serviço com preço variável.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Consertos, pinturas, etc.
                </Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
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