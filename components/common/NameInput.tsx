import { StyleSheet, View, Text, TextInput } from 'react-native'

interface NameInputProps {
    setName: React.Dispatch<React.SetStateAction<string>>
    bgColor?: string
    textColor?: string
}

export default function NameInput({ setName, bgColor, textColor }: NameInputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={{
                color: textColor ? textColor : 'black',
                fontWeight: 'bold'
            }}
            >
                Nome:
            </Text>
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: bgColor ? bgColor : '#E0E0E0'
                }}
                onChangeText={text => setName(text.trim())}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative'
    },
    input: {
        color: 'black',
        padding: 4,
        borderRadius: 3,
        width: '70%',
        marginStart: 8,
        paddingHorizontal: 8
    }
})