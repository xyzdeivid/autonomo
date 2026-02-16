import { useGetTheme } from '@/hooks/common/useGetTheme'
import { Pressable, StyleSheet, Text } from 'react-native'

interface CancelEditButtonProps {
    onCancelButtonPress: () => void
}

export function CancelEditButton({ onCancelButtonPress }: CancelEditButtonProps) {

    const theme = useGetTheme()

    return (
        <Pressable
            style={styles.cancelButton}
            onPress={onCancelButtonPress}
        >
            <Text style={{ color: theme === 'dark' ? 'red' : 'darkred' }}>Cancelar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    cancelButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#6600001a',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'darkred'
    }

})