import { StyleSheet, View } from 'react-native'

interface ListItemCardBodyProps {
    children: React.ReactNode
}

export function ListItemCardBody({ children }: ListItemCardBodyProps) {

    return (
        <View style={styles.body}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({

    body: {
        paddingTop: 24,
        paddingHorizontal: 16,
        backgroundColor: '#FFF'
    }

})