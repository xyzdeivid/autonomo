import { StyleSheet, View } from 'react-native'

interface FormInputsProps {
    children: React.ReactNode
}

export default function FormInputs({ children }: FormInputsProps) {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    }
})