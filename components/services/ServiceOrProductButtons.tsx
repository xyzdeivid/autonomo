import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ServiceOrProductButtonsProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ServiceOrProductButtons({ choice, setChoice }: ServiceOrProductButtonsProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? '#000000'
            : '#404040'
    }

    return (
        <View style={styles.container}>
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
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    textButton: {
        color: 'white'
    }
})