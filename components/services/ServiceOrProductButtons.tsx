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

    const getText = () => {
        switch (choice) {
            case 'product':
                return 'produto com estoque'                
            case 'service':
                return 'serviço com valor definido'
            case 'budget':
                return 'serviço com valor variável'
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={{
                        ...styles.button,
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                        backgroundColor: checkChoice('product')
                    }}
                    onPress={() => setChoice('product')}
                >
                    <Text style={styles.textButton}>Produto</Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.button,
                        backgroundColor: checkChoice('service')
                    }}
                    onPress={() => setChoice('service')}
                >
                    <Text style={styles.textButton}>Serviço</Text>
                </Pressable>
                <Pressable
                    style={{
                        ...styles.button,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        backgroundColor: checkChoice('budget')
                    }}
                    onPress={() => setChoice('budget')}
                >
                    <Text style={styles.textButton}>Orçamentário</Text>
                </Pressable>
            </View>
            <Text style={styles.infoText}>Caso seu novo item seja um {getText()}.</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    textButton: {
        color: 'white'
    },
    infoText: {
        color: 'rgba(51, 0, 102, 0.5)',
        fontSize: 12,
        marginTop: 2
    }
})