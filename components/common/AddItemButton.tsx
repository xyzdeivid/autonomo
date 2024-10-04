import { Pressable, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    bgColor?: string
}

export default function AddItemButton({ setForm, bgColor }: AddItemButtonProps) {

    return (
        <Pressable onPress={() => setForm(true)}
            style={{
                ...styles.button,
                backgroundColor: bgColor ? bgColor : '#004AAD'
            }}
        >
            <Entypo name='add-to-list' size={24} color='white' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        padding: 6,
        alignSelf: 'flex-start',
        marginStart: 10,
        borderRadius: 3
    }
})