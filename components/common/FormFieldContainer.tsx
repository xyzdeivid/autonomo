import { View, StyleSheet } from 'react-native'

interface FieldContainerProps {
    children: React.ReactNode
    borderBottomColor?: string
}

export function FormFieldContainer({ children, borderBottomColor }: FieldContainerProps) {
    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                {children}
            </View>
            <View style={[
                styles.hr,
                { borderBottomColor: borderBottomColor || '#00000080' }
            ]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: '100%'
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },

    hr: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%'
    }

})