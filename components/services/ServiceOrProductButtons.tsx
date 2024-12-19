import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ServiceOrProductButtonsProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ServiceOrProductButtons({ choice, setChoice }: ServiceOrProductButtonsProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? '#330066'
            : '#6600CC'
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('product')
                    }}
                    onPress={() => setChoice('product')}
                >
                    <Text style={styles.textButton}>Produto</Text>
                </Pressable>
                <Text
                    style={{
                        ...styles.infoText,
                        fontWeight: choice === 'product' ? 'bold' : 'normal',
                        textDecorationLine: choice === 'product' ? 'underline' : 'none'
                    }}
                >
                    Selecione esta opção se o seu novo item de trabalho for um produto manufaturado destinado à venda.
                    Como por exemplo: vestuário, acessórios, alimentos, etc...
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('service')
                    }}
                    onPress={() => setChoice('service')}
                >
                    <Text style={styles.textButton}>Serviço</Text>
                </Pressable>
                <Text
                    style={{
                        ...styles.infoText,
                        fontWeight: choice === 'service' ? 'bold' : 'normal',
                        textDecorationLine: choice === 'service' ? 'underline' : 'none'
                    }}
                >
                    Selecione esta opção se o seu novo item de trabalho for um serviço prestado com um valor fixo definido.
                    Como por exemplo: serviços de beleza (cortes de cabelo, maquiagem), etc...
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('budget')
                    }}
                    onPress={() => setChoice('budget')}
                >
                    <Text style={styles.textButton}>Orçamentário</Text>
                </Pressable>
                <Text
                    style={{
                        ...styles.infoText,
                        fontWeight: choice === 'budget' ? 'bold' : 'normal',
                        textDecorationLine: choice === 'budget' ? 'underline' : 'none'
                    }}
                >
                    Selecione esta opção se o seu novo item de trabalho for um serviço prestado cujo valor pode variar
                    conforme as condições ou requisitos do cliente. Como por exemplo: reparos, manutenção, etc...
                </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    buttonContainer: {
        marginBottom: 20
    },
    button: {
        alignSelf: 'flex-start',
        padding: 7,
        borderTopStartRadius: 7
    },
    textButton: {
        color: 'white',
        fontSize: 14
    },
    infoText: {
        color: '#330066',
        marginTop: 6
    }
})