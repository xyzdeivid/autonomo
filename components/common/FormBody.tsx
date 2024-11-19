import { StyleSheet, View } from 'react-native'

interface FormBodyProps {
    children: React.ReactNode
    borderColor?: string
    bgColor?: string
}

export default function FormBody({ children, borderColor, bgColor }: FormBodyProps) {

    return (
        <View style={{
            ...style.body,
            borderColor: borderColor ? borderColor : 'transparent',
            backgroundColor: bgColor ? bgColor : '#FFFFFF'
        }}
        >
            {children}
        </View>
    )

}

const style = StyleSheet.create({
    body: {
        padding: 16,
        borderRadius: 16,
        minWidth: '80%',
        marginHorizontal: 20,
        borderWidth: 1
    }
})