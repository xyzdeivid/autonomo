import { StyleSheet, Text, View } from 'react-native'
import { CloseFormButton } from './CloseFormButton'

interface FormTitleProps {
    text: string
    onCloseFormButtonPress: () => void
    textColor?: string
}

export default function FormTitle({ text, onCloseFormButtonPress, textColor = '#000' }: FormTitleProps) {

    const borderColor = textColor.startsWith('#') ? `${textColor}26` : '#00000015'
    const iconColor = textColor.startsWith('#') ? `${textColor}80` : textColor

    return (
        <View style={[styles.container, { borderBottomColor: borderColor }]}>
            <View style={styles.topRow}>
                <Text
                    numberOfLines={1}
                    style={[styles.text, { color: textColor }]}
                >
                    {text}
                </Text>

                <CloseFormButton
                    onPress={onCloseFormButtonPress}
                    color={iconColor}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 20,
        paddingBottom: 12, 
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
    }

})