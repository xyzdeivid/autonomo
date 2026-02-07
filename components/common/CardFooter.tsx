import { StyleSheet, View } from 'react-native'

export function CardFooter({ children }: { children: React.ReactNode }) {

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
        alignItems: 'center',
        marginBottom: 8
    }

})