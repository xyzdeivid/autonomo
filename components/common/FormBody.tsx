import { StyleSheet, View } from 'react-native'

interface FormBodyProps {
    children: React.ReactNode
    borderColor?: string
}

export default function FormBody({ children, borderColor }: FormBodyProps) {

    return (
        <View style={{
            ...style.body,
            borderColor: borderColor ? borderColor : 'transparent'
        }}
        >
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
        borderWidth: 1
    }
})