import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ListItemCardPropertyProps {
    label: string
    text: string
    bgColor: string
    onEditButtonPress?: () => void
}

export function ListItemCardProperty({ label, text, bgColor, onEditButtonPress }: ListItemCardPropertyProps) {

    return (
        <View style={{
            ...styles.container,
            backgroundColor: bgColor
        }}>
            <Text style={styles.label}>{label}: </Text>
            <Text style={styles.text}>
                {text}
            </Text>
            {
                onEditButtonPress && (
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
        borderRadius: 8
    },

    label: {
        fontSize: 16,
        fontWeight: '500'
    },

    text: {
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