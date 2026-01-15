import { Pressable, StyleSheet, Text, View } from 'react-native'

interface EditablePropertyProps {
    label: string
    propertyName: string
    isEditable: boolean
    onEditablePropertyButtonPress?: () => void
}

export function EditableProperty({ label, propertyName, isEditable, onEditablePropertyButtonPress }: EditablePropertyProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}: </Text>
            <Text style={styles.propertyName}>{propertyName}</Text>
            {
                isEditable && (
                    <Pressable
                        style={styles.button}
                        onPress={onEditablePropertyButtonPress}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </Pressable>
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
        marginBottom: 24
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    propertyName: {
        fontSize: 16
    },

    button: {
        backgroundColor: '#E0E0E0',
        padding: 8,
        borderRadius: 4,
        marginStart: 16
    },

    buttonText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.5)'
    }

})