import { colors } from '@/constants/appColors'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { CloseFormButton } from '../common/CloseFormButton'

interface CreateItemFormHeaderProps {
    title: string
    onComeBackButtonPress: () => void
    onCloseFormButtonPress: () => void
}

export default function CreateItemFormHeader({ title, onComeBackButtonPress, onCloseFormButtonPress }: CreateItemFormHeaderProps) {

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={styles.closeButtonsContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={onComeBackButtonPress}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </Pressable>
                    <CloseFormButton color='white' onPress={onCloseFormButtonPress} />
                </View>
            </View>
            <View style={styles.hr} />
        </>
    )

}

const styles = StyleSheet.create({

    header: {
        backgroundColor: colors.items.mid,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8
    },

    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },

    closeButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        backgroundColor: colors.items.min,
        padding: 6,
        borderRadius: 8,
        marginEnd: 24
    },

    buttonText: {
        fontSize: 16,
        color: 'white'
    },

    hr: {
        marginTop: 12,
        marginBottom: 24,
        width: '100%',
        height: 1.25,
        backgroundColor: colors.items.min
    }

})