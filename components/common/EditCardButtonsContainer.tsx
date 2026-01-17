import { StyleSheet, View } from 'react-native'

interface EditCardButtonsContainerProps {
    children: React.ReactNode
}

export function EditCardButtonsContainer({ children }: EditCardButtonsContainerProps) {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    }

})