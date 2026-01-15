import { View, Text, TextInput, StyleSheet } from 'react-native'
import { ConfirmEditButton } from './ConfirmEditButton'
import { CancelEditButton } from './CancelEditButton'

interface EditNameInputProps {
    defaultValue: string
    newName: string
    setNewName: React.Dispatch<React.SetStateAction<string>>
    onSuccessButtonPress: () => Promise<void>
    onCancelButtonPress: () => void
}

export function EditNameField({ defaultValue, newName, setNewName, onSuccessButtonPress, onCancelButtonPress }: EditNameInputProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput defaultValue={defaultValue} onChangeText={text => setNewName(text.trim())} style={styles.input} />
            {
                newName && newName !== defaultValue && (
                    <ConfirmEditButton
                        onSuccessButtonPress={onSuccessButtonPress}
                    />
                )
            }
            {
                (!newName || newName === defaultValue) && (
                    <CancelEditButton
                        onCancelButtonPress={onCancelButtonPress}
                    />
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },

    label: {
        fontWeight: 'bold',
        fontSize: 16
    },

    input: {
        width: '50%',
        backgroundColor: '#E0E0E0',
        color: 'black',
        padding: 8,
        textAlign: 'center',
        marginStart: 8,
        borderRadius: 3

    }

})