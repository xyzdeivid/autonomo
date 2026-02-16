import { useGetTheme } from '@/hooks/common/useGetTheme'
import { View, Text, StyleSheet } from 'react-native'

export function InitialLoading() {

    const theme = useGetTheme()

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme === 'dark' ? '#000' : '#FFF'
            }}
        >
            <Text
                style={{
                    fontSize: 64,
                    color: theme === 'dark' ? '#FFF' : '#000'
                }}
            >
                . . .
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }

})