import Entypo from '@expo/vector-icons/Entypo'
import { Pressable, StyleSheet } from 'react-native'

export default function AddItemButton() {

    return (
        <Pressable style={styles.button}>
            <Entypo name="add-to-list" size={24} color="white" />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        paddingStart: 10
    }
})