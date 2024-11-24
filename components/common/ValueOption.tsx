import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ValueOptionProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
    buttonColors: string[]
}

export default function ValueOption({ choice, setChoice, buttonColors }: ValueOptionProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? buttonColors[0]
            : buttonColors[1]
    }

    return (
        <View style={styles.buttonsContainer}>
            <Pressable style={{
                ...styles.button,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                backgroundColor: checkChoice('total')
            }}
                onPress={() => setChoice('total')}
            >
                <Text style={styles.textButton}>Total</Text>
            </Pressable>
            <Pressable style={{
                ...styles.button,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                backgroundColor: checkChoice('un')
            }}
                onPress={() => setChoice('un')}
            >
                <Text style={styles.textButton}>Unidade</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: -18,
        marginBottom: 20
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },

    textButton: {
        color: 'white',
        fontSize: 12
    }

})