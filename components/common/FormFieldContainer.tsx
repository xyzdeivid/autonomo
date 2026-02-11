import { View, StyleSheet } from 'react-native'

interface FieldContainerProps {
    children: React.ReactNode
}

export function FormFieldContainer({ children }: FieldContainerProps) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 20
    }

})