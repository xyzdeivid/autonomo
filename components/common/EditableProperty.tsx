import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Label } from './Label'

interface EditablePropertyProps {
    label: string
    propertyName: string
    isEditable: boolean
    onEditButtonPress?: () => void
    bgColor: string
    borderColor: string
}

export function EditableProperty({ label, propertyName, isEditable, onEditButtonPress, bgColor, borderColor }: EditablePropertyProps) {

    return (
        <View style={{
            ...styles.container,
            backgroundColor: bgColor,
            borderColor: borderColor
        }}>
            <Label text={label} />
            <Text style={styles.propertyName}>
                {propertyName}
            </Text>
            {
                isEditable && (
                    <Pressable
                        style={styles.button}
                        onPress={onEditButtonPress}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </Pressable>
                )
            }
        </View>
    )

}

const mainColor = '#066C9180'

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        padding: 16,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth
    },

    propertyName: {
        fontSize: 16
    },

    button: {
        borderLeftColor: mainColor,
        borderLeftWidth: StyleSheet.hairlineWidth,
        marginLeft: 8,
        paddingLeft: 8
    },

    buttonText: {
        fontSize: 16,
        color: mainColor
    }

})