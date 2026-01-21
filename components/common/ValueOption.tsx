import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ValueOptionProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
    buttonColors: [string, string]
}

export default function ValueOption({ choice, setChoice, buttonColors }: ValueOptionProps) {

    const checkBackgroundChoice = (button: string) => {
        return choice === button
            ? buttonColors[0]
            : buttonColors[1]
    }

    const checkColorChoice = (button: string) => {
        return choice === button
            ? 'white'
            : buttonColors[0]
    }

    return (
        <View style={styles.buttonsContainer}>
            <Pressable style={{
                ...styles.button,
                backgroundColor: checkBackgroundChoice('total')
            }}
                onPress={() => setChoice('total')}
            >
                <Text style={{ color: checkColorChoice('total') }}>Total</Text>
            </Pressable>
            <Pressable style={{
                ...styles.button,
                borderBottomRightRadius: 6,
                backgroundColor: checkBackgroundChoice('un')
            }}
                onPress={() => setChoice('un')}
            >
                <Text style={{ color: checkColorChoice('un') }}>Un</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({

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
    }

})