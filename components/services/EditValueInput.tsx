import { Pressable, StyleSheet, View, Text } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

interface EditValueInputProps {
    setValue: React.Dispatch<React.SetStateAction<number>>
    editValue: () => void
}

export default function EditValueInput({ setValue, editValue }: EditValueInputProps) {

    return (
        <View style={styles.container}>
            <MaskedTextInput
                type='currency'
                options={{
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 2
                }}
                style={styles.editInput}
                keyboardType='numeric'
                onChangeText={text => {
                    // Removendo pontos e vírgulas do valor
                    let value = text.replace(',', '.')
                        .replace(/\.(?=.*\.)/g, '')

                    setValue(Number(value))
                }}
            />
            <Pressable
                style={styles.editButton}
                onPress={() => editValue()}
            >
                <Text style={{ color: 'white' }}>Ok</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editInput: {
        width: '40%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    },
    editButton: {
        backgroundColor: 'blue',
        borderColor: 'darkblue',
        borderWidth: 1,
        padding: 4,
        borderRadius: 4,
        marginStart: 8
    }
})