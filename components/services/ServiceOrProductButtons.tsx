import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ServiceOrProductButtonsProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ServiceOrProductButtons({ choice, setChoice }: ServiceOrProductButtonsProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? ['#6600CC', '#FFFFFF']
            : ['transparent', '#6600CC']
    }

    return (
        <View style={styles.container}>
            <View>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('product')[0],
                    }}
                    onPress={() => setChoice('product')}
                >
                    <Text style={{
                        ...styles.textButton,
                        color: checkChoice('product')[1]
                    }}>Produto</Text>
                </Pressable>
                <Text
                    style={styles.infoText}
                >
                    Produto destinado à venda ou revenda.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Roupas, eletrônicos, alimentos, etc.
                </Text>
            </View>
            <View
                style={styles.hr}
            />
            <View>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('service')[0],
                    }}
                    onPress={() => setChoice('service')}
                >
                    <Text style={{
                        ...styles.textButton,
                        color: checkChoice('service')[1]
                    }}>Serviço</Text>
                </Pressable>
                <Text
                    style={styles.infoText}
                >
                    Serviço prestado com um valor fixo.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Cortes de cabelo, maquiagens, etc.
                </Text>
            </View>
            <View
                style={styles.hr}
            />
            <View>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('budget')[0]
                    }}
                    onPress={() => setChoice('budget')}
                >
                    <Text style={{
                        ...styles.textButton,
                        color: checkChoice('budget')[1]
                    }}>Orçamentário</Text>
                </Pressable>
                <Text
                    style={styles.infoText}
                >
                    Serviço prestado cujo valor pode variar
                    conforme as condições ou requisitos do cliente.
                </Text>
                <Text
                    style={styles.exampleText}
                >
                    Ex: Consertos, pinturas, etc.
                </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    button: {
        alignSelf: 'flex-start',
        padding: 7,
        borderColor: '#330066',
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 4
    },
    textButton: {
        color: '#330066',
        fontSize: 14
    },
    infoText: {
        color: '#6600CC',
        marginVertical: 6
    },
    exampleText: {
        backgroundColor: '#6600CC',
        color: '#FFFFFF',
        padding: 4,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'flex-start'
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#330066',
        marginTop: 20,
        marginBottom: 40
    }
})