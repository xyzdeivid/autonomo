import { StyleSheet, View } from 'react-native'

interface FormBodyProps {
    children: React.ReactNode
}

export default function FormBody({ children }: FormBodyProps) {

    return (
        <View style={style.body}>
            {children}
        </View>
    )

}

const style = StyleSheet.create({
    body: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 6
    }
})