import { Pressable, StyleSheet } from 'react-native'

interface OptionsListContainerProps {
    children: React.ReactNode
    onPressOutside: () => void
}

export function OptionsListContainer({ children, onPressOutside }: OptionsListContainerProps) {

    return (
        <Pressable
            style={styles.container}
            onPress={onPressOutside}
        >
            {children}
        </Pressable>
    )

}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040'
    }

})