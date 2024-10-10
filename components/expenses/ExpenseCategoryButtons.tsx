import { View, Pressable, Text, StyleSheet } from 'react-native'

interface ExpenseCategoryButtonsProps {
    choice: string
    setChoice: React.Dispatch<React.SetStateAction<string>>
}

export default function ExpenseCategoryButtons({ choice, setChoice }: ExpenseCategoryButtonsProps) {

    const checkChoice = (button: string) => {
        return choice === button
            ? '#660000'
            : '#990000'
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    ...styles.button,
                    backgroundColor: checkChoice('expense'),
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4
                }}
                onPress={() => setChoice('expense')}
            >
                <Text style={styles.textButton}>Despesa</Text>
            </Pressable>
            <Pressable
                style={{
                    ...styles.button,
                    backgroundColor: checkChoice('resale'),
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4
                }}
                onPress={() => setChoice('resale')}
            >
                <Text style={styles.textButton}>Revenda</Text>
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