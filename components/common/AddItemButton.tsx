import { Pressable, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddItemButton({ setForm }: AddItemButtonProps) {

    return (
        <Pressable onPress={() => setForm(true)} style={styles.button}>
            <Entypo name='add-to-list' size={24} color='black' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        paddingStart: 10
    }
})