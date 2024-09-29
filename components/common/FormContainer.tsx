import { StyleSheet, View } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {

    return (
        <View style={style.container}>
            {children}
        </View>
    )

}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        opacity: 0.9,
    }
})