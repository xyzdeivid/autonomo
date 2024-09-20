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
        backgroundColor: '#3D3D3D',
        padding: 10
    }
})