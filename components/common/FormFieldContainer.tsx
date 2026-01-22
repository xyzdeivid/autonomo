import { View, StyleSheet } from 'react-native'

interface FieldContainerProps {
    children: React.ReactNode
}

export function FormFieldContainer({ children }: FieldContainerProps) {
    return (
        <View>
            <View>
                {children}
            </View>
            <View style={styles.hr} />
        </View>
    )
}

const styles = StyleSheet.create({

    hr: {
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: '#0000001A',
        marginVertical: 16
    }

})