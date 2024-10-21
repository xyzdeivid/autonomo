import { Image, StyleSheet, View } from 'react-native'
import icon from '@/assets/images/header-icon.png'

export default function LoadingScreen() {

    return (
        <View style={styles.container}>
            <Image source={icon} style={{ width: 64, height: 64 }} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute'
    }
})