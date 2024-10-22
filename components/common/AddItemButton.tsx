import { Pressable, Button, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

interface AddItemButtonProps {
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    bgColor?: string
}

export default function AddItemButton({ setForm, bgColor }: AddItemButtonProps) {

    return (
        <Pressable 
        style={{
            ...styles.buttonContainer,
        backgroundColor: bgColor ? bgColor : '#08819B'
        }}
        onPress={() => setForm(true)}
        >
            <Entypo name='add-to-list' size={28} color='#FFFFFF' />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        margin: 20,
        padding: 10,
        borderRadius: 10
    }
})