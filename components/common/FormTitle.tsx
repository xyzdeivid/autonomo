import { StyleSheet, Text, View } from 'react-native'
import { CloseFormButton } from './CloseFormButton'
import { useGetTheme } from '@/hooks/common/useGetTheme'

interface FormTitleProps {
    text: string
    onCloseFormButtonPress: () => void
    textColor: string
}

export default function FormTitle({ text, onCloseFormButtonPress, textColor }: FormTitleProps) {

    const theme = useGetTheme()

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text
                    numberOfLines={1}
                    style={[styles.text, { color: theme === 'dark' ? '#FFF' : textColor }]}
                >
                    {text}
                </Text>

                <CloseFormButton
                    onPress={onCloseFormButtonPress}
                    color={textColor}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 24
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