import { useGetTheme } from '@/hooks/common/useGetTheme'
import { Pressable, StyleSheet, Text } from 'react-native'

export function CloseCardButton({ onPress }: { onPress: () => void }) {

    const theme = useGetTheme()

    return (
        <Pressable
            onPress={onPress}
            style={{
                ...styles.button,
                borderColor: theme === 'dark' ? '#FFF' : '#A1A1A1'
            }}
        >
            <Text style={{ color: theme === 'dark' ? '#FFF' : '#A1A1A1' }}>Fechar</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({

    button: {
        padding: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4
    }

})