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
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        minWidth: '80%',
        marginHorizontal: 20,
    }
})