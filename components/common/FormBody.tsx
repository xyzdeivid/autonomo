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
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 6,
        minWidth: '80%',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray'
    }
})