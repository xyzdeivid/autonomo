import { View, StyleSheet } from 'react-native'

interface FieldContainerProps {
    children: React.ReactNode
}

export function FormFieldContainer({ children }: FieldContainerProps) {
    return (
        <View>
            <View style={styles.container}>
                {children}
            </View>
            <View style={styles.hr} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        borderRadius: 6,
        overflow: 'hidden'
    },

    hr: {
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: '#0000001A',
        marginVertical: 16
    }

})