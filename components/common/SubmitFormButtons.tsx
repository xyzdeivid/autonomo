import { Pressable, View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

interface SubmitFormButtonsProps {
    submit: () => void
    setFormOff: React.Dispatch<React.SetStateAction<boolean>>
    submitButtonText: string
}

export default function SubmitFormButtons({ submit, setFormOff, submitButtonText }: SubmitFormButtonsProps) {

    return (
        <View style={styles.buttonsContainer}>
            <Pressable onPress={() => submit()} style={{ ...styles.button, backgroundColor: 'darkgreen' }}>
                <Text style={{ color: 'white' }}>{submitButtonText}</Text>
            </Pressable>
            <Pressable onPress={() => setFormOff(false)} style={{ ...styles.button, backgroundColor: 'darkred' }}>
                <AntDesign name='close' size={24} color='white' />
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        padding: 8,
        borderRadius: 3
    }
})