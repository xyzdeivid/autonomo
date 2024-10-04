import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ServiceOrProductButtonsProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ServiceOrProductButtons({ choice, setChoice }: ServiceOrProductButtonsProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? 'darkgreen'
            : 'green'
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    ...styles.button,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
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
                    backgroundColor: checkChoice('product')
                }}
                onPress={() => setChoice('product')}
            >
                <Text style={styles.textButton}>Produto</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    textButton: {
        color: 'white'
    }
})