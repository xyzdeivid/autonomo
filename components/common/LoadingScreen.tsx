import { Image, StyleSheet, View } from 'react-native'
import icon from '@/assets/images/header-icon.png'
import { useGetTheme } from '@/hooks/common/useGetTheme'
import { colors } from '@/styles/appColors'

export default function LoadingScreen() {

    const theme = useGetTheme()

    return (
        <View style={{ ...styles.container, backgroundColor: theme === 'dark' ? colors.cardBackground.dark : colors.cardBackground.light }}>
            <Image source={icon} style={{ width: 64, height: 64 }} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        position: 'absolute'
    }
})