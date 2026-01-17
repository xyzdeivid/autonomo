import { StyleSheet, Text, View } from 'react-native'
import { CloseFormButton } from './CloseFormButton'

interface ListItemCardHeaderProps {
    text: string
    bgColor: string
    onCloseCardButton: () => void
}

export function ListItemCardHeader({ text, bgColor, onCloseCardButton }: ListItemCardHeaderProps) {

    return (
        <View style={{ ...styles.container, backgroundColor: bgColor }}>
            <Text style={styles.text}>{text}</Text>
            <CloseFormButton color='#FFF' onPress={onCloseCardButton} />
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },

    text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFF'
    }

})