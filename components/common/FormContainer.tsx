import { StyleSheet, View } from 'react-native'

interface FormContainerProps {
    children: React.ReactNode
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    bgColor?: string
    setButton: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormContainer({ children }: FormContainerProps) {

    return (
        <View
            style={styles.container}
        >
            <View>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        paddingHorizontal: 16
    }
})