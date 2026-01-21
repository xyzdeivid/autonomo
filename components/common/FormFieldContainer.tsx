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
        marginBottom: 24,
        borderRadius: 6,
        overflow: 'hidden'
    }

})